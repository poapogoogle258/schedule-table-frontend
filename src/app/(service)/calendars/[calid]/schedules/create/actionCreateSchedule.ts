"use server"

import type { ScheduleFormData } from "./formCreateSchedule"
import type { ServerActionError } from "@/type/serverAction"
import type { CreateSchedule } from "@/type/schedule"

import { createSchedule } from "@/api/schedules"
// import { revalidatePath } from "next/cache"
import { permanentRedirect } from 'next/navigation'
import { auth } from "@/auth"

export default async function ActionCreateSchedule(calendarId : string ,data : ScheduleFormData) : Promise<ServerActionError> {
    
    const session = await auth()
    const token = session!.token

    const payloads: CreateSchedule = {
        name: data.name,
        master_id: data.master_id,
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
        use_number_people: data.use_number_people,
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