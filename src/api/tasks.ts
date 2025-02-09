import client from "./client";
import type { Response } from "./client";
import type { Task } from "@/type/task"

import type { Dayjs } from "dayjs";

export interface UpdateTaskPayload {
    member_id : string | undefined
    start : string
    end : string
    status : number
}

export function fetchTasks(calendar_id: string, start: Dayjs, end: Dayjs, token: string) {
    return client.get<Response<Task[]>>(`/api/calendars/${calendar_id}/tasks`, {
        params: {
            "start": start.toJSON(),
            "end": end.toJSON()
        },
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

}


export function updateTask(calendarId: string, taskId: string, payload: UpdateTaskPayload, token: string){
    return client.patch<Response<Task>>(`/api/calendars/${calendarId}/tasks/${taskId}`, payload, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}
