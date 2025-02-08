"use server"

import type { ScheduleFormData } from "./formEditSchedule"
import type { ServerActionError } from "@/type/serverAction"
import type { Schedule } from "@/type/schedule"

import { updateSchedule } from "@/api/schedules"
import { permanentRedirect } from 'next/navigation'
import { auth } from "@/auth"

export default async function ActionUpdateSchedule(calendarId : string ,scheduleId : string ,data : ScheduleFormData) : Promise<ServerActionError> {
    

    const session = await auth()
    const token = session!.token

    const payloads: Schedule = {
        id:scheduleId,
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
        recurrence: {
            freq: data.freq,
            count: data.count,
            interval: data.interval,
            byweekday: data.byweekday,
            bymonth: data.bymonth
        },
        members: data.members!,
        use_number_people : data.use_number_people
    }
    
    try{
        await updateSchedule(calendarId,scheduleId, payloads, token)
    }catch(err){
        return {
            error : "something wrong"
        }
    }

    permanentRedirect(`/calendars/${calendarId}/schedules`)

}