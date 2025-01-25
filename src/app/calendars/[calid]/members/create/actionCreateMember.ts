'use server'

import { cookies } from "next/headers";
import { createMember } from '@/api/members'
import { redirect, RedirectType } from "next/navigation";
import type { ServerActionError } from "@/type/serverAction"
import type { FormDataMember } from "@/type/form"

export default async function createNewMember(calenderId : string,formData: FormDataMember) : Promise<ServerActionError> {

    const cookiesStone = await cookies()
    const token = cookiesStone.get("token")!.value

    try { 
        const resp = await createMember(calenderId, formData, token)
    } catch (error) {
        return {
            error : error as string
        }
    }

    redirect(`/calendars/${calenderId}/members`, RedirectType.push);
}

