"use server"

import type { ServerActionError } from "@/type/serverAction"
import { editTask } from "@/api/tasks"

import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export interface TaskEditPayload {
    member_id : string | undefined
    start : string
    end : string
    status : number
}

export async function submittedTaskAction(calendarId : string, taskId : string, payloads : TaskEditPayload) : Promise<ServerActionError | undefined> {
    const session = await auth()

    try{
        const resp = await editTask(calendarId, taskId, payloads, session!.token)
    }catch(err){
        return { error : "something wrong"}
    }

    revalidatePath(`/calendars/${calendarId}`)

}