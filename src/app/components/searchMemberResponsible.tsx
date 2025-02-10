"use client"

import React, {useState, useMemo } from "react"
import { Select } from "antd"
import type { SelectProps } from "antd";
import { fetchMembersResponsible } from "@/api/schedules";
import { useSession } from "next-auth/react"
import type { Member } from "@/type/member";


export interface SearchMemberResponsible {
    scheduleId : string
    calendarId : string
    value? : Member
    onChange? : (data: Member) => void
}
export const SelectMemberResponsible: React.FC<SearchMemberResponsible> = ({scheduleId ,calendarId, value, onChange}) => {

    const { data: session } = useSession()
    const token = session!.access_token!
    const [ members , setMembers] = useState<Member[]>()

    const options: SelectProps['options'] = useMemo(() => {
        if(members){
            return members?.map((member, index) => ({
                label : `${member.name} (${member.nickname})`,
                value : index
            }))
        }else{
            const defaultValueOptions = value ? [{value : value.id , label : value.name}] : []
            return defaultValueOptions
        }
    },[members])

    const initial = async() => {
        if(members === undefined){
            const resp = await fetchMembersResponsible(calendarId, scheduleId, token)
            setMembers(resp.data.data)
        }
    }

    const handleChange = (index: any) => {
        onChange!(members![index])
    }

    const defaultValue = options.length > 0 ? options[0].value : undefined

    return <Select 
        defaultValue={defaultValue} 
        onFocus={initial} 
        options={options} 
        onSelect={handleChange}
    />
}