'use server'

import { updateMember, type UpdateMemberPayload } from "@/api/members"

import type { ServerActionError } from "@/type/serverAction"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

export async function updateMemberAction(calendarId: string, memberId: string, payload: UpdateMemberPayload): Promise<ServerActionError> {

    const session = await auth()

    try {
        await updateMember(calendarId, memberId, payload, session!.token)
    } catch (err) {
        return {
            error: (err as Error).message
        }
    }

    redirect(`/calendars/${calendarId}/members`)

}