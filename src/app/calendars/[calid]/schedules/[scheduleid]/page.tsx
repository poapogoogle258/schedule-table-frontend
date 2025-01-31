'use server'

import React from "react";

import { cookies } from "next/headers";

import FormEditSchedule from "./formEditSchedule"

import { fetchMembers } from "@/api/members"
import { fetchSchedules } from "@/api/schedules"

export default async function EditSchedukePage({ params }: { params: Promise<{ calid: string, scheduleid: string }> }) {

    const { calid, scheduleid } = await params

    const cookiesStone = await cookies()
    const token = cookiesStone.get("token")!.value

    const [resp_members, resp_schedule] = await Promise.all([fetchMembers(calid, "all=true", token), fetchSchedules(calid, token)])

    return (
        <main>
            <FormEditSchedule
                members={resp_members.data.data.data}
                schedules={resp_schedule.data.data}
            />
        </main>
    )
}