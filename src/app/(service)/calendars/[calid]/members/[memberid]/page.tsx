'use server'

import React from "react";

import { fetchMember } from "@/api/members"

import FormEditMember from "./formEditMember"
import { auth } from "@/auth";

export default async function EditMemberPage({ params }: { params: Promise<{ calid: string, memberid: string }> }) {

  const { calid, memberid } = await params

    const session = await auth()
    const token = session!.access_token!

  const res = await fetchMember(calid, memberid, token)

  return (
    <main className="container mx-auto my-10">
      <FormEditMember member={res.data.data} />
    </main>
  )
}