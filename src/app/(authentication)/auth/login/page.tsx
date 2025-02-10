'use server'

import { auth } from "@/auth"
import { redirect, RedirectType } from "next/navigation"
import { fetchProfile } from "@/api/auth";



import FromLogin from "./formLogin";

export default async function LoginPage({ req, searchParams }: { req: Request, searchParams: Promise<{ callbackUrl?: string }> }) {

    const session = await auth()

    if (session?.user) {
        const { callbackUrl } = await searchParams
        if (callbackUrl) {
            redirect(callbackUrl)
        } else {
            const token = session!.access_token!
            const resp = await fetchProfile(token)
            redirect(`/calendars/${resp.data.data.calendar_id}`, RedirectType.replace)
        }
    }

    return (
        <main>
            <FromLogin />
        </main>
    )

}