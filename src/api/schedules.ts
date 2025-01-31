import client from "./client";
import type { Response } from "./client";
import type { Schedule, CreateSchedule } from "@/type/schedule"

export async function fetchSchedules(calendarId: string, token: string) {
    const resp = client.get<Response<Schedule[]>>(`/api/calendars/${calendarId}/schedules`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return resp
}

export async function fetchSchedule(calendarId: string, scheduleId: string, token: string) {
    const resp = client.get<Response<Schedule>>(`/api/calendars/${calendarId}/schedules/${scheduleId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return resp
}

export function createSchedule(calendarId: string, payloads: CreateSchedule, token: string) {
    return client.post<Response<Schedule>>(`/api/calendars/${calendarId}/schedules`, payloads, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

export function updateSchedule(calendarId: string, scheduleId: string, payloads: Schedule, token: string) {
    return client.patch<Response<Schedule>>(`/api/calendars/${calendarId}/schedules/${scheduleId}`, payloads, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

export function deleteSchedule(calendarId: string, scheduleId: string, token: string) {
    return client.delete<Response<Schedule>>(`/api/calendars/${calendarId}/schedules/${scheduleId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}