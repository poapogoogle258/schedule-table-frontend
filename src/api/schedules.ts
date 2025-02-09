import client from "./client";
import type { Response } from "./client";
import type { Schedule } from "@/type/schedule"
import type { Member } from "@/type/member";
export type CreateSchedulePayload = Omit<Schedule, 'id'>
export type UpdateSchedulePayload = Schedule


export function fetchSchedules(calendarId: string, token: string) {
    return client.get<Response<Schedule[]>>(`/api/calendars/${calendarId}/schedules`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export function fetchSchedule(calendarId: string, scheduleId: string, token: string) {
    return client.get<Response<Schedule>>(`/api/calendars/${calendarId}/schedules/${scheduleId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

}

export function createSchedule(calendarId: string, payload: CreateSchedulePayload, token: string) {
    return client.post<Response<Schedule>>(`/api/calendars/${calendarId}/schedules`, payload, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

export function updateSchedule(calendarId: string, scheduleId: string, payload: UpdateSchedulePayload, token: string) {
    return client.patch<Response<Schedule>>(`/api/calendars/${calendarId}/schedules/${scheduleId}`, payload, {
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

export function fetchMembersResponsible(calendarId: string, scheduleId: string, token: string) {
    return client.get<Response<Member[]>>(`/api/calendars/${calendarId}/schedules/${scheduleId}/responsible`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}