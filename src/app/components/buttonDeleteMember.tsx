'use client'

import React, { useState } from 'react';

import { DeleteOutlined ,QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd';
import type { PopconfirmProps, ButtonProps } from 'antd';

import { useParams } from 'next/navigation';

import ActionDeleteMember from "@/app/actions/deleteMember"
import type { Member } from '@/type/member';

export default function ButtonDeleteMember({ member }: { member: Member }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const { calid } = useParams<{ calid : string }>()

    
    const onConfirm: PopconfirmProps['onConfirm'] = async (e) => {
        setLoading(true)
        await ActionDeleteMember(calid, member.id )
        setLoading(false)
        setOpen(false)
    }

    const onCancel: PopconfirmProps['onCancel'] = () => {
        setOpen(false)
    }

    const showPopconfirm: ButtonProps['onClick'] = () => {
        setOpen(true)
    }

    return <>
        <Popconfirm
            title="ลบข้อข้อมูล"
            description={`ต้องการลบข้อมูลของ ${member.name} (${member.nickname}) หรือไม่`}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={onConfirm}
            open={open}
            onCancel={onCancel}
            okButtonProps={{ loading: loading }}
        >
            <Button
                type='text'
                icon={<DeleteOutlined />}
                onClick={showPopconfirm}
                danger
            />
        </Popconfirm>
    </>

};



