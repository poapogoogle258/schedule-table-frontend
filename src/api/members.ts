import client from "./client";
import type { Response } from "./client";

export interface Member {
    id: string
    imageURL: string
    name: string
    nickname: string
    color: string
    description: string
    position: string
    email: string
    telephone: string
}

export async function fetchMember(calendarId : string ,memberId : string, token : string) {
    const res = client.get<Response<Member>>(`/api/calendars/${calendarId}/members/${memberId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return res
}

export async function fetchMembers(calendar_id: string, token: string) {
    const res = client.get<Response<Member[]>>(`/api/calendars/${calendar_id}/members`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return res
}
