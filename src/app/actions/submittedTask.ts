"use server"

import type { ServerActionError } from "@/type/serverAction"
import { updateTask, type UpdateTaskPayload } from "@/api/tasks"

import { auth } from "@/auth"
import { revalidatePath } from "next/cache"


export async function submittedTaskAction(calendarId : string, taskId : string, payload : UpdateTaskPayload) : Promise<ServerActionError | undefined> {
    
    const session = await auth()
    const token = session!.access_token!

    try{
        console.log(JSON.stringify(payload))
        await updateTask(calendarId, taskId, payload, token)
    }catch(err){
        return { error : (err as Error).message }
    }

    revalidatePath(`/calendars/${calendarId}`)

}