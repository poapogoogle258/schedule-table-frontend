"use server"

import { auth } from "@/auth"
import { redirect, RedirectType } from "next/navigation"


// set redirect page to my_calendarId

export default async function CalendarsPage(){
    const session = await auth()
    
    if(session?.user){
        redirect(`/calendars/${session.user.calendar_id}`, RedirectType.replace)
    }else{
        redirect(`/auth/login`, RedirectType.replace)
    }

    return <></>

}