'use client'

import React, { useState } from 'react';
import { Flex, Table, TableColumnsType, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import type { Member } from "@/api/members"

import ButtonDeleteMember from "@/app/components/buttonDeleteMember"
import Link from 'next/link';
import { usePathname } from "next/navigation"

export default function MembersTable({ dataSource }: { dataSource: Member[] }) {

    const pathname = usePathname()

    const columns: TableColumnsType<Member> = [
        {
            key: "image",
            title: 'รูปภาพ',
            dataIndex: 'image',
            width: '10%',
            align: 'center',
            render: (_, record) => dataSource.length >= 1 ? <>
                <img
                    src={record.imageURL}
                    alt={record.name}
                    style={{
                        "margin": "auto",
                        "verticalAlign": "middle",
                        "width": "64px",
                        "height": "64px",
                        "borderRadius": "10%",
                    }}
                />
            </> : null
        },
        {
            key : "name",
            title: 'ชื่อ',
            dataIndex: 'name',
            width: '40%',
            render: (_, record) => dataSource.length >= 1 ? <>
                <Flex vertical gap='small'>
                    <Flex><h3>{record.name}</h3>&nbsp;&nbsp;<h4>({record.nickname})</h4></Flex>
                    <h5 style={{ opacity: '0.5' }}>{record.description}</h5>
                </Flex>
            </> : null
        },
        {
            key : "action",
            title: '',
            dataIndex: 'operator',
            width: '8%',
            render: (_, record: Member) => dataSource.length >= 1 ? <>
                <Flex justify='space-evenly' align='center'>
                    <Link href={`${pathname}/${record.id}`} shallow={true}>
                        <Button
                            type='text'
                            icon={<EditOutlined />}
                        />
                    </Link>
                    <ButtonDeleteMember member={record} />
                </Flex>
            </> : null
        }
    ];

    return <Table
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={{ position: ["bottomCenter"] }}
    />
};