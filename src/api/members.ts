import client from "./client";
import type { Response } from "./client";
import type { Member } from "@/type/member"


export interface CreateMemberPayload {
    imageURL: string
    name: string
    nickname: string
    description: string
    telephone: string
    email: string
    color: string
    position: string
}

export interface UpdateMemberPayload {
    imageURL: string
    name: string
    nickname: string
    description: string
    telephone: string
    email: string
    color: string
    position: string
}

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
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}

export function fetchMembers(calendar_id: string, query: string, token: string) {
    return client.get<Response<MemberTable>>(`/api/calendars/${calendar_id}/members?${query}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}

export function createMember(calendar_id: string, payload: CreateMemberPayload, token: string) {
    return client.post<Response<Member>>(`/api/calendars/${calendar_id}/members`, payload, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

export function updateMember(calendar_id: string, memberId: string, member: UpdateMemberPayload, token: string) {
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
