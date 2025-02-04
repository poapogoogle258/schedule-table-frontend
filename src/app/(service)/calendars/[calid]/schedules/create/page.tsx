'use server'

import React from "react";

import { cookies } from "next/headers";

import FormCreateSchedule from "./formCreateSchedule";

import { fetchMembers } from "@/api/members";
import { fetchSchedules } from "@/api/schedules";

export default async function CreateSchedulePage({ params }: { params: Promise<{ calid: string }> }) {

    const calendarId = (await params).calid

    const cookiesStone = await cookies()
    const token = cookiesStone.get("token")!.value

    const [resp_members, resp_schedule] = await Promise.all([fetchMembers(calendarId, "all=true", token), fetchSchedules(calendarId, token)])

    return (
        <main>
            <FormCreateSchedule
                members={resp_members.data.data.data}
                schedules={resp_schedule.data.data}
            />
        </main>
    )


}
