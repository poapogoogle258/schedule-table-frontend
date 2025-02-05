import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import { login as scheduleLogin } from "@/api/auth"
import { z } from 'zod';

export const authOptions: NextAuthConfig = {
    secret : process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        Credentials({
            name: 'Credentials',
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
                        return resp.data
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            }
        }),
    ],
    strategy: "jwt",
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.user_id = user.profile.id;
                token.user_name = user.profile.name;
                token.user_email = user.profile.email;
                token.user_imageURL = user.profile.imageURL;
                token.user_description = user.profile.description;
                token.user_calendar_id = user.profile.calendar_id;
                token.exp = user.exp;
                token.token = user.token;
            }
            return token
        },
        session({ session, token }) {
            if (session?.user) {
                session.user = {
                    id: token.user_id,
                    name: token.user_name,
                    email: token.user_email,
                    imageURL: token.user_imageURL,
                    description: token.user_description,
                    calendar_id: token.user_calendar_id,
                }
                session.exp = token.exp;
                session.token = token.token;
            }

            return session
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            if (isLoggedIn) {
                const isOnCalendars = nextUrl.pathname.startsWith('/calendars');
                if (isOnCalendars) {
                    return true
                } else {
                    return Response.redirect(new URL(`/calendars/${auth.profile.calendar_id}`, nextUrl));
                }
            } else {
                return false
            }
        },
    },
    pages: {
        signIn: '/auth/login',
        signUp: '/auth/signup',
    },
};

export const { auth, signIn, signOut, handlers } = NextAuth(authOptions);

