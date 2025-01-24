'use server'

import { cookies } from "next/headers";
import { createMember } from '@/api/members'
import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from 'next/cache'

type ActionError = { error : string}
type ServerActionError = ActionError | undefined 

export default async function createNewMember(calenderId : string,formData: FormData) : Promise<ServerActionError> {

    const cookiesStone = await cookies()
    const token = cookiesStone.get("token")!.value

    try { 
        const resp = await createMember(calenderId, formData, token)
    } catch (error) {
        return {
            error : error as string
        }
    }

    revalidatePath(`/calendars/${calenderId}/members/create`)
    redirect(`/calendars/${calenderId}/members`, RedirectType.replace);

}

