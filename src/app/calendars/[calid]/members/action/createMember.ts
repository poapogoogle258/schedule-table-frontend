'use server'

import { z } from "zod"

export default async function createMemberAction(form : FormData) {

    const body = {
      "name" : values.name,
      "nickName" : values.nickName,
      "profile" : values?.upload[0].response.filename ?? null,
      "description" : values.description,
      "tag" : values.tag.split(','),
      "address" : {
          "phone" : values.phone,
          "line" : values.line,
          "email" : values.email
      }
    }
}