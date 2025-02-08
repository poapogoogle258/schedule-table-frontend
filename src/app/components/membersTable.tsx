'use client'

import React from 'react';
import { Flex, Table, TableColumnsType, Button, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { EditOutlined } from '@ant-design/icons'

import type { Member } from "@/type/member"

import ButtonDeleteMember from "@/app/components/buttonDeleteMember"
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function MembersTable({ dataSource, page, limit, total }: { dataSource: Member[], page: number, limit: number, total: number }) {

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { replace } = useRouter();

    const PaginationOnChange: PaginationProps['onChange'] = (page: number, pageSize: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString())
        params.set("limit", limit.toString())
        replace(pathname + '?' + params.toString())
    }

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
            key: "name",
            title: 'ชื่อ',
            dataIndex: 'name',
            width: '40%',
            render: (_, record) => dataSource.length >= 1 ? <>
                <div className='flex flex-col'>
                    <h3 >{record.name}&nbsp;({record.nickname})</h3>
                    <h5 style={{ opacity: '0.5' }}>{record.description}</h5>
                </div>
            </> : null
        },
        {
            key: "position",
            title: 'ตำแหน่ง',
            dataIndex: 'position',
            width: '10%',
            render: (_, record) => dataSource.length >= 1 ? <p>
                {record.position}
            </p> : null
        },
        {
            key: "action",
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

    return <>
        <Table
            className='my-5'
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            rowKey="id"
            columns={columns}
            pagination={false}
        />
        <Pagination align='center' current={page} defaultCurrent={1} total={total} pageSize={15} onChange={PaginationOnChange} />
    </>

};