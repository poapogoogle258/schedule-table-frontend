'use server'

import { createMember } from '@/api/members'
import { redirect, RedirectType } from "next/navigation";
import type { ServerActionError } from "@/type/serverAction"
import type { FormDataMember } from "@/type/form"
import { auth } from "@/auth";

export default async function createNewMember(calenderId : string,formData: FormDataMember) : Promise<ServerActionError> {

    const session = await auth()
    const token = session!.token

    try { 
        const resp = await createMember(calenderId, formData, token)
    } catch (error) {
        return {
            error : error as string
        }
    }

    redirect(`/calendars/${calenderId}/members`, RedirectType.push);
}

