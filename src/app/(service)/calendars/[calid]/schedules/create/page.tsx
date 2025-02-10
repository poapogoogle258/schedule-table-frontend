'use server'

import React from "react";

import FormCreateSchedule from "./formCreateSchedule";

import { fetchMembers } from "@/api/members";
import { fetchSchedules } from "@/api/schedules";
import { auth } from "@/auth";

export default async function CreateSchedulePage({ params }: { params: Promise<{ calid: string }> }) {

    const calendarId = (await params).calid

    const session = await auth()
    const token = session!.access_token!

    const [resp_members, resp_schedule] = await Promise.all([fetchMembers(calendarId, "all=true", token), fetchSchedules(calendarId, token)])

    return (
        <main>
            <div className="container mx-auto px-4 py-10">
                <FormCreateSchedule
                    members={resp_members.data.data.data}
                    schedules={resp_schedule.data.data}
                />
            </div>
        </main>
    )


}
