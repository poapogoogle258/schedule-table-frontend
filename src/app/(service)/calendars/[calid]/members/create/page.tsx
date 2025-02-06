'use server'

import React from "react";

import FormCreatedMember from "./formCreatedMember";

export default async function CreateMemberPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <FormCreatedMember />
    </main>
  )
}
