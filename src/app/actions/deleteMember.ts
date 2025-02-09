"use server"

import { deleteMember } from "@/api/members"
import { revalidatePath } from "next/cache";
import type { ServerActionError } from "@/type/serverAction"
import { auth } from "@/auth";

export async function deleteMemberAction (calendarId : string, memberId : string) : Promise<ServerActionError | undefined> {
    const session = await auth()

    try{
        await deleteMember(calendarId, memberId, session!.token)
    }catch(err){
        return { error : (err as Error).message}
    }

    revalidatePath(`/calendars/${calendarId}/members`)


}
