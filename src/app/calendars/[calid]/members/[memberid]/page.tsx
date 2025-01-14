'use server'

import React from "react";

import { cookies } from "next/headers";

import { fetchMember } from "@/api/members"

import FormEditMember from "@/app/components/formEditMember"

export default async function EditMemberPage({ params }: { params: Promise<{ calid: string, memberid: string }> }) {

  const { calid, memberid } = await params

  const cookiesStone = await cookies()
  const token = cookiesStone.get("token")!.value
  const res = await fetchMember(calid, memberid, token)

  return <>
    <FormEditMember member={res.data.data} />
  </>


}