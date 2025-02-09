import client from "./client";
import type { Response } from "./client";
import type { FormDataMember } from "@/type/form"
import type { Member } from "@/type/member"

export interface Pagination {
    total_records : number
    current_page : number
    limit : number
}

export interface MemberTable {
    data: Member[]
    pagination: Pagination
}

export function fetchMember(calendarId: string, memberId: string, token: string) {
    return client.get<Response<Member>>(`/api/calendars/${calendarId}/members/${memberId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export function fetchMembers(calendar_id: string, query: string, token: string) {
    return client.get<Response<MemberTable>>(`/api/calendars/${calendar_id}/members?${query}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export function createMember(calendar_id: string, member: FormDataMember, token: string) {
    return client.post<Response<Member>>(`/api/calendars/${calendar_id}/members`, member, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

export function editMember(calendar_id: string, memberId: string, member: FormDataMember, token: string) {
    return client.patch<Response<Member>>(`/api/calendars/${calendar_id}/members/${memberId}`, member, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

export function deleteMember(calendar_id: string, memberId: string, token: string) {
    return client.delete(`/api/calendars/${calendar_id}/members/${memberId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}
