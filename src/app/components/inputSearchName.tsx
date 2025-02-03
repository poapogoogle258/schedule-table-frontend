"use client"

import React, { useMemo, useState, useContext, useEffect } from "react"
import type { Member } from "@/type/member"

import { AutoComplete } from 'antd';
import type { AutoCompleteProps } from 'antd';
import { searchContext } from "@/app/calendars/[calid]/search-name-provider"

interface InputSearchNameMemberProps {
    members: Member[]
}
const InputSearchNameMember: React.FC<InputSearchNameMemberProps> = ({ members }) => {

    const { search, setSearch } = useContext(searchContext)
    const [input, setInput] = useState("")

    const options = useMemo(() => {
        return members.map((member) => ({
            label: member.name,
            value: member.name,
            key: member.id
        }))
    }, [])

    const indexOfLabel = useMemo(() => {
        return options.findIndex((option) => option.value === input)
    }, [input])

    useEffect(() => {
        if (indexOfLabel !== -1) {
            setSearch(options[indexOfLabel].key)
        }else if(input == ""){
            setSearch("")
        }
    }, [input])

    const onChange: AutoCompleteProps['onChange'] = (value) => {
        setInput(value)
    }

    return (
        <AutoComplete
            status={(input === "" || indexOfLabel !== -1) ? "" : "warning"}
            placeholder="ค้นหาชื่อสมาชิก"
            style={{ width: "50vw" }}
            size='middle'
            value={input}
            onChange={onChange}
            options={options}
            filterOption={(inputValue, option) =>
                option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
        />
    )
}

export default InputSearchNameMember;