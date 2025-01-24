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


export function fetchMember(calendarId : string ,memberId : string, token : string) {
    return client.get<Response<Member>>(`/api/calendars/${calendarId}/members/${memberId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

}

export function fetchMembers(calendar_id: string, token: string) {
    return client.get<Response<Member[]>>(`/api/calendars/${calendar_id}/members`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export function createMember(calendar_id: string, member: FormData, token : string) {
    return client.post<Response<Member>>(`/api/calendars/${calendar_id}/members`, member, {
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    })

}
