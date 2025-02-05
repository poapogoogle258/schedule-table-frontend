'use server'

// import { login , fetchProfile } from "@/api/auth"
// import { z } from 'zod';
// import { cookies } from 'next/headers'

// import { redirect } from 'next/navigation';

// export default async function LoginAction(formData: FormData) {

//     const FromScheme = z.object({
//         email: z.string(),
//         password: z.string(),
//     })

//     const form = FromScheme.parse({
//         email: formData.get("email"),
//         password: formData.get("password")
//     })

//     const resLogin = await login(form.email, form.password)
//     if (resLogin.status != 200){

//         return
//     }

//     const profile = await fetchProfile(resLogin.data.token)
//     const cookieStore = await cookies()
//     cookieStore.set("profile", JSON.stringify(profile))
//     cookieStore.set("token", resLogin.data.token)

//     redirect(`/calendars/${profile.data.calendar_id}`)
// }

import {signIn} from '@/auth';

import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {

  try {
    await signIn('credentials', formData);
    
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}