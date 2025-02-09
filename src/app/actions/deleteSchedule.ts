"use server"

import { deleteSchedule } from "@/api/schedules";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export default async function actionDeleteSchedule(calendarId : string, scheduleId : string){

    const session = await auth()
    const token = session!.token

    try{
        await deleteSchedule(calendarId, scheduleId, token)
    }catch(err){
        return {
            error : err
        }
    }

    revalidatePath(`/calendars/${calendarId}/schedules`)

}