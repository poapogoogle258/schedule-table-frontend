"use server"

import type { ServerActionError } from "@/type/serverAction"

import { updateSchedule, type UpdateSchedulePayload } from "@/api/schedules"
import { permanentRedirect } from 'next/navigation'
import { auth } from "@/auth"

export async function updateScheduleAction(calendarId : string ,scheduleId : string , payload : UpdateSchedulePayload ) : Promise<ServerActionError> {
    
    const session = await auth()
    
    try{
        await updateSchedule(calendarId,scheduleId, payload, session!.token)
    }catch(err){
        return {
            error : (err as Error).message
        }
    }

    permanentRedirect(`/calendars/${calendarId}/schedules`)

}