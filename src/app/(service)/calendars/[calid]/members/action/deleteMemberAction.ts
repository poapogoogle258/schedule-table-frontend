"use server"

import { cookies } from "next/headers";
import { deleteMember } from "@/api/members"

import { revalidatePath } from "next/cache";
import type { ServerActionError } from "@/type/serverAction"


export default async function actionDeleteMember(calendarId : string, memberId : string) : Promise<ServerActionError | undefined> {
    const cookiesStone = await cookies()
    const token = cookiesStone.get("token")!.value

    const resp = await deleteMember(calendarId, memberId, token)
    if(resp.status === 204){
        revalidatePath(`/calendars/${calendarId}/members`)
    }else{
        return {
            error : resp.data.error,
        }
    }

}
