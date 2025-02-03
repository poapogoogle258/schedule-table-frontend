import client from "./client";
import type { Response } from "./client";
import type { Task } from "@/type/task"


export async function fetchTasks(calendar_id: string, start: Date, end: Date, token: string) {
    const res = client.get<Response<Task[]>>(`/api/calendars/${calendar_id}/tasks`, {
        params: {
            "start": start.toISOString(),
            "end": end.toISOString(),
            "action": "generate",
        },
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return res
}
