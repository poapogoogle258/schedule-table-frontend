import client from "./client";
import type { Response } from "./client";

interface Person {
    imageURL: string
    name: string
    nickname: string
    color: string
    description: string
    position: string
    email: string
    telephone: string
}

export interface Task {
    id: string
    calendar_id: string
    schedule_id: string
    start: string
    end: string
    status: number
    person: Person
}

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
