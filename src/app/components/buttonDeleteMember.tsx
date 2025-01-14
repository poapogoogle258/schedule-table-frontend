'use client'

import React from 'react';

import type { Member } from '@/api/members';

import { DeleteOutlined ,QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd';

export default function ButtonDeleteMember({ member }: { member: Member }) {

    return <>
        <Popconfirm
            title="ลบข้อข้อมูล"
            description={`ต้องการลบข้อมูลของ ${member.name} (${member.nickname}) หรือไม่`}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        >
            <Button
                type='text'
                icon={<DeleteOutlined />}
                danger
            />
        </Popconfirm>
    </>

};

