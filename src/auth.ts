import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import { login as scheduleLogin, signUp as scheduleSignUp } from "@/api/auth"
import { z } from 'zod';
import { btoa } from 'buffer';

export const authOptions: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        }
      }
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "text ", placeholder: "inputemail@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        const parsedCredentials = z.object({ email: z.string().email(), password: z.string() }).safeParse(credentials)
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const resp = await scheduleLogin(email, password)
          if (resp.status === 200) {
            return resp.data.user
          } else {
            return null
          }
        } else {
          return null
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        // First-time login, save the `access_token`, its expiry and the `refresh_token`
        let access_token : string | undefined
        let expires_at : number | undefined
        let error : string | undefined

        if (account?.provider == "google") {
          const password = btoa(user.email!) + process.env.SALT_PASSWORD

          try {
            const resultSignIn = await scheduleLogin(user.email!, password)
            access_token = resultSignIn.data.access_token
            expires_at = resultSignIn.data.expires_at
          } catch (err) {

            // register change google_access_token to schedule_table_access_token
            const resultSignUp = await scheduleSignUp(user.name!, user.email!, password, user.image!, "google")
            if (resultSignUp.status === 201) {
              const resultSignIn = await scheduleLogin(user.email!, password)
              access_token = resultSignIn.data.access_token
              expires_at = resultSignIn.data.expires_at
            } else {
              error = "SignUpServiceFailed"
            }
          }
        }

        return {
          ...token,
          access_token: access_token ??  account.access_token,
          expires_at: expires_at ?? account.expires_at,
          error : error 
        }
      }

      return token

    },
    async session({ session, token }) {
      session.access_token = token.access_token
      session.error = token.error
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      return isLoggedIn
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};

declare module "next-auth" {
  interface Session {
    error?: string
    provider?: string
    access_token?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string
    expires_at: number
    error?: string
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth(authOptions);

