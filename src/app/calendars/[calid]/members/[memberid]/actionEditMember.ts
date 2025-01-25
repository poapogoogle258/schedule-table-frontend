'use server'

import { editMember } from "@/api/members"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

import type { ServerActionError } from "@/type/serverAction"
import type { FormDataMember } from "@/type/form"


export default async function actionEditMember(calendarId: string, memberId: string, formData: FormDataMember): Promise<ServerActionError> {

    const cookiesStone = await cookies()
    const token = cookiesStone.get("token")!.value

    try {
        await editMember(calendarId, memberId, formData, token)
    } catch (error) {
        console.log('actionEditMember error' , error)

        return {
            error: error as string
        }
    }

    console.log('actionEditMember error 0')

}