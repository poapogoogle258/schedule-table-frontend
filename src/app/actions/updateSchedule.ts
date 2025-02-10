"use server"

import type { ServerActionError } from "@/type/serverAction"

import { updateSchedule, type UpdateSchedulePayload } from "@/api/schedules"
import { permanentRedirect } from 'next/navigation'
import { auth } from "@/auth"

export async function updateScheduleAction(calendarId : string ,scheduleId : string , payload : UpdateSchedulePayload ) : Promise<ServerActionError> {
    
    const session = await auth()
    const token = session!.access_token!
    
    try{
        await updateSchedule(calendarId,scheduleId, payload, token)
    }catch(err){
        return {
            error : (err as Error).message
        }
    }

    permanentRedirect(`/calendars/${calendarId}/schedules`)

}