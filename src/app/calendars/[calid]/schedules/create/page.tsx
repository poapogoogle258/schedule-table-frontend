'use server'

import React from "react";

import { cookies } from "next/headers";

import FormCreateSchedule from "@/app/components/formCreateSchedule";

export default async function CreateSchedulePage({ params }: { params: Promise<{ calid: string }> }) {

    const calendarId = (await params).calid

    const cookiesStone = await cookies()
    const token = cookiesStone.get("token")!.value

    return <>
        <FormCreateSchedule />
    </>

}
