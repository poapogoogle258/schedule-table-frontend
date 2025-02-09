import client from "./client";
import type { Response } from "./client";
import type { Task } from "@/type/task"

import type { Dayjs } from "dayjs";


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

import type { TaskEditPayload } from "@/app/actions/submittedTask";

export function editTask(calendarId: string, taskId: string, payloads: TaskEditPayload, token: string){
    return client.patch<Response<Task>>(`/api/calendars/${calendarId}/tasks/${taskId}`, payloads, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}
