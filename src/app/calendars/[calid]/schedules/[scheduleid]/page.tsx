'use server'

import React from "react";

import { cookies } from "next/headers";

import FormEditSchedule from "@/app/components/formEditSchedule"

import { fetchSchedule } from "@/api/schedules"

export default async function EditSchedukePage({ params }: { params: Promise<{ calid: string, scheduleid: string }> }) {

    const { calid, scheduleid } = await params

    const cookiesStone = await cookies()
    const token = cookiesStone.get("token")!.value

    const resp = await fetchSchedule(calid, scheduleid, token)

    return <>
        <FormEditSchedule schedule={resp.data.data} />
    </>
}