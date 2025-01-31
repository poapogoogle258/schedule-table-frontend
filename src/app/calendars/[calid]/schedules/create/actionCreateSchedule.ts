"use server"

import type { ScheduleFormData } from "./formCreateSchedule"
import type { ServerActionError } from "@/type/serverAction"
import type { CreateSchedule } from "@/type/schedule"

import { createSchedule } from "@/api/schedules"
import { cookies } from "next/headers"
// import { revalidatePath } from "next/cache"
import { permanentRedirect } from 'next/navigation'

export default async function ActionCreateSchedule(calendarId : string ,data : ScheduleFormData) : Promise<ServerActionError> {
    
    const cookiesStone = await cookies()
    const token = cookiesStone.get("token")!.value

    const payloads: CreateSchedule = {
        name: data.name,
        master_id: data.scheduleMasterId,
        calendar_id: calendarId,
        description: data.description,
        imageURL: data.imageURL,
        priority: data.priority,
        start: data.start!,
        end: data.end!,
        hr_start: data.hr_start!,
        hr_end: data.hr_end!,
        tzid: "Asia/Bangkok", // TO DO : load from dayjs 
        breaktime: data.breaktime,
        recurrence: {
            freq: data.freq,
            count: data.count,
            interval: data.interval,
            byweekday: data.byweekday,
            bymonth: data.bymonth
        },
        members: data.members!,
    }

    try{
        await createSchedule(calendarId, payloads, token)
    }catch(err){
        return {
            error : "something wrong"
        }
    }

    // revalidatePath(`/calendars/${calendarId}/schedules`)
    permanentRedirect(`/calendars/${calendarId}/schedules`)

}