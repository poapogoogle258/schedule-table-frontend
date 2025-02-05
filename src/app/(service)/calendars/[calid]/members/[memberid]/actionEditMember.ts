'use server'

import { editMember } from "@/api/members"


import type { ServerActionError } from "@/type/serverAction"
import type { FormDataMember } from "@/type/form"
import { auth } from "@/auth"


export default async function actionEditMember(calendarId: string, memberId: string, formData: FormDataMember): Promise<ServerActionError> {

    const session = await auth()
    const token = session!.token

    try {
        await editMember(calendarId, memberId, formData, token)
    } catch (error) {
        return {
            error: error as string
        }
    }


}