"use server"

import { deleteSchedule } from "@/api/schedules";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function actionDeleteSchedule(calendarId : string, scheduleId : string){

    const cookiesStone = await cookies()
    const token = cookiesStone.get("token")!.value

    try{
        await deleteSchedule(calendarId, scheduleId, token)
    }catch(err){
        return {
            error : err
        }
    }

    revalidatePath(`/calendars/${calendarId}/schedules`)

}