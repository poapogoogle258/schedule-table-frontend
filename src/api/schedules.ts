import client from "./client";
import type { Response } from "./client";
import type { Schedule } from "@/type/schedule"

export async function fetchSchedules(calendarId : string , token : string) {
    const resp = client.get<Response<Schedule[]>>(`/api/calendars/${calendarId}/schedules`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return resp 
}

export async function fetchSchedule(calendarId : string ,scheduleId : string ,token : string) {
    const resp = client.get<Response<Schedule>>(`/api/calendars/${calendarId}/schedules/${scheduleId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return resp 
}