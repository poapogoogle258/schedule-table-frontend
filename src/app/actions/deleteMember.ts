"use server"

import { deleteMember } from "@/api/members"

import { revalidatePath } from "next/cache";
import type { ServerActionError } from "@/type/serverAction"
import { auth } from "@/auth";


export default async function actionDeleteMember(calendarId : string, memberId : string) : Promise<ServerActionError | undefined> {
    const session = await auth()
    const token = session!.token

    const resp = await deleteMember(calendarId, memberId, token)
    if(resp.status === 204){
        revalidatePath(`/calendars/${calendarId}/members`)
    }else{
        return {
            error : resp.data.error,
        }
    }

}
