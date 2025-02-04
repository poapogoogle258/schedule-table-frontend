"use client"

import React, { useMemo, useState, useContext, useEffect } from "react"
import type { Member } from "@/type/member"

import { AutoComplete, Button } from 'antd';
import type { AutoCompleteProps } from 'antd';
import { useCalendarPageStore } from "@/state/provider/calendar-page-provider";

interface InputSearchNameMemberProps {
    members: Member[]
}
const InputSearchNameMember: React.FC<InputSearchNameMemberProps> = ({ members }) => {

    const { setTextSearched } = useCalendarPageStore((state) => state)
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
            setTextSearched(options[indexOfLabel].value)
        } else if (input == "") {
            setTextSearched("")
        }
    }, [input])

    const onChange: AutoCompleteProps['onChange'] = (value) => {
        setInput(value)
    }

    return (
        <AutoComplete
            className="w-full"
            status={(input === "" || indexOfLabel !== -1) ? "" : "warning"}
            placeholder="ค้นหาชื่อสมาชิก"
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