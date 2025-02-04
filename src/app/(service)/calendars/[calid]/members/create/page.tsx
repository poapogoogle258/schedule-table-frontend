'use server'

import React from "react";

import FormCreatedMember from "./formCreatedMember";

export default async function CreateMemberPage() {
  return (
    <main className="container mx-auto my-10">
      <FormCreatedMember />
    </main>
  )
}
