'use server'

import { createMember, type CreateMemberPayload } from '@/api/members'
import { redirect, RedirectType } from "next/navigation";
import type { ServerActionError } from "@/type/serverAction"

import { auth } from "@/auth";


export async function createMemberAction(calenderId : string, payload: CreateMemberPayload) : Promise<ServerActionError> {

    const session = await auth()
    const token = session!.token

    try { 
        await createMember(calenderId, payload, token)
    } catch (err) {
        return {
            error : (err as Error).message
        }
    }

    redirect(`/calendars/${calenderId}/members`, RedirectType.push);
}

