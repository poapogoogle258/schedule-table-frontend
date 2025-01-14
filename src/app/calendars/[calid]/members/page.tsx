'use server'

import React from "react";

import { fetchMembers } from "@/api/members"

import { cookies } from "next/headers";

import MembersTable from "@/app/components/membersTable";

export default async function MembersManagement({ params }: { params: Promise<{ calid: string }> }){

    const calendarId =  (await params).calid
    const cookiesStone = await cookies()
    const token = cookiesStone.get("token")!.value

    const res = await fetchMembers(calendarId, token)

    return <>
        <MembersTable dataSource={res.data.data} />
    </>
}