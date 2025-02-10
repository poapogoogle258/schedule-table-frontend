"use server"

import { deleteSchedule } from "@/api/schedules";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function deleteScheduleAction(calendarId: string, scheduleId: string) {

    const session = await auth()
    const token = session!.access_token!

    try {
        await deleteSchedule(calendarId, scheduleId, token)
    } catch (err) {
        return { error: (err as Error).message }
    }

    revalidatePath(`/calendars/${calendarId}/schedules`)

}