'use server'

import React from "react";

import { cookies } from "next/headers";

import FormCreatedMember from "@/app/components/formCreatedMember";


export default async function CreateMemberPage({ params }: { params: Promise<{ calid: string}> }) {

  const calendarId = (await params).calid

  const cookiesStone = await cookies()
  const token = cookiesStone.get("token")!.value

  return <>
    <FormCreatedMember />
  </>

}
