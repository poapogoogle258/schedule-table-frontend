"use server"

import type { ServerActionError } from "@/type/serverAction"

import { createSchedule , type CreateSchedulePayload } from "@/api/schedules"
import { permanentRedirect } from 'next/navigation'

import { auth } from "@/auth"


export async function createScheduleAction(calendarId : string ,payload : CreateSchedulePayload) : Promise<ServerActionError> {
    
    const session = await auth()
    const token = session!.access_token!


    try{
        await createSchedule(calendarId, payload, token)
    }catch(err){
        return {
            error : "something wrong"
        }
    }

    permanentRedirect(`/calendars/${calendarId}/schedules`)

}