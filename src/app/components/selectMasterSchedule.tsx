"use client"

import React, { useState } from "react"
import { Flex, Table, TableColumnsType, Button, Pagination } from 'antd';
import type { PaginationProps, TableProps } from 'antd';
import { EditOutlined } from '@ant-design/icons'

import type { Schedule } from "@/type/schedule"

import ButtonDeleteMember from "@/app/components/buttonDeleteMember"
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type DataType = {
    key: React.Key;
    name: string;
    description: string;
};

type onChangeState = (data: string) => void | undefined

export default function SelectMasterScheduleTable({ dataSource, value, onChange }: { dataSource: Schedule[], value?: string, onChange?: onChangeState }) {

    const data = dataSource.filter((item) => item.master_id == null).map((item, index) => ({
        key: item.id,
        name: item.name,
        description: item.description
    } as DataType))

    const [keySelected, SetKeySelected] = useState<React.Key[]>(value ? [value] : [])

    const rowSelection: TableProps<DataType>['rowSelection'] = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            onChange!(selectedRowKeys[0] as string)
            SetKeySelected(selectedRowKeys)
        },
        selectedRowKeys: keySelected
    };

    const columns: TableColumnsType<DataType> = [
        {
            key: "name",
            title: 'ชื่อ',
            dataIndex: 'name',
            render: (_, record) => dataSource.length >= 1 ? <>
                <Flex vertical gap='small'>
                    <Flex><h3>{record.name}</h3></Flex>
                    <h5 style={{ opacity: '0.5' }}>{record.description}</h5>
                </Flex>
            </> : null
        }
    ];

    return <>
        {keySelected.length != 0 && <Button type="link" className="px-3" onClick={() => { SetKeySelected([]) }} >
            <p className="font-thin italic text-blue-500 hover:text-blue-800">
                cancel
            </p>
        </Button>}
        <Table
            className='mx-5'
            bordered
            dataSource={data}
            columns={columns}
            pagination={false}
            rowSelection={{ type: 'radio', ...rowSelection }}
        />
    </>

}