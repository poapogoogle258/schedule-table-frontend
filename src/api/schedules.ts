import client from "./client";
import type { Response } from "./client";
import type { Member } from "./members";


interface Recurrence {
    freq: number;
    count: number;
    interval: number;
    byweekday: number[];
    bymonth: number[];
}
  
export interface Schedule {
    id: string;
    master_id: string | null;
    calendar_id: string;
    name: string;
    description: string;
    imageURL: string;
    priority: number;
    start: string;
    end: string;
    hr_start: string;
    hr_end: string;
    tzid: string;
    breaktime: number;
    recurrence: Recurrence,
    members: Member[]
}

export async function fetchSchedules(calendarId : string , token : string) {
    const resp = client.get<Response<Schedule[]>>(`/api/calendars/${calendarId}/schedules`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return resp 
}