'use server'

import React from "react";

import FormEditSchedule from "./formEditSchedule"

import { fetchMembers } from "@/api/members"
import { fetchSchedules } from "@/api/schedules"
import { auth } from "@/auth";

export default async function EditSchedukePage({ params }: { params: Promise<{ calid: string, scheduleid: string }> }) {

    const { calid, scheduleid } = await params

    const session = await auth()
    const token = session!.access_token!

    const [resp_members, resp_schedule] = await Promise.all([fetchMembers(calid, "all=true", token), fetchSchedules(calid, token)])

    return (
        <main>
            <div className="container mx-auth px-4 py-4">
                <FormEditSchedule
                    members={resp_members.data.data.data}
                    schedules={resp_schedule.data.data}
                />
            </div>

        </main>
    )
}