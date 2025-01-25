import client from "./client";
import type { Response } from "./client";

import type { FormDataMember } from "@/type/form"
import type { Member } from "@/type/member"
import type {Pagination} from "@/type/panition"

interface MemberTable {
    data : Member[]
    pagination : Pagination
} 

export function fetchMember(calendarId : string ,memberId : string, token : string) {
    return client.get<Response<Member>>(`/api/calendars/${calendarId}/members/${memberId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export function fetchMembers(calendar_id: string, query : string, token: string) {
    return client.get<Response<MemberTable>>(`/api/calendars/${calendar_id}/members?${query}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export function createMember(calendar_id: string, member: FormDataMember, token : string) {
    return client.post<Response<Member>>(`/api/calendars/${calendar_id}/members`, member, {
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

export function editMember(calendar_id: string, memberId :string ,member: FormDataMember, token : string) {
    return client.patch<Response<Member>>(`/api/calendars/${calendar_id}/members/${memberId}`, member, {
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}
