"use client"

import React, { useState } from "react"
import { Flex, Table, TableColumnsType, Button, Pagination } from 'antd';
import type { PaginationProps, TableProps } from 'antd';
import { EditOutlined } from '@ant-design/icons'

import type { Member } from "@/type/member"

import ButtonDeleteMember from "@/app/components/buttonDeleteMember"
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface DataType {
    key: React.Key
    name: string
    nickname: string
    description: string
    position: string
}

type onChangeState = (data: Member[]) => void | undefined

function SelectKeyToValue(keys: React.Key[], dataSource: Member[]): Member[] {

    const data: Member[] = []
    for (const key of keys) {
        const findIndexOfKey = (value: Member, index: number) => {
            return value.id == key
        }
        const indexOfKey = dataSource.findIndex(findIndexOfKey)
        if (indexOfKey == -1) {
            throw Error("not fount schedule id in dataSource")
        }

        data.push(dataSource[indexOfKey])
    }

    return data

}

function selectId(value: Member, index: Number): string {
    return value.id
}


export default function SelectMemberTable({ dataSource, value, onChange }: { dataSource: Member[], value?: Member[], onChange?: onChangeState }) {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(value!.map(selectId) || []);

    const data = dataSource.map((item, index) => ({
        key: item.id,
        name: item.name,
        nickname: item.nickname,
        description: item.description,
        position: item.position
    }))

    const rowSelection: TableProps<DataType>['rowSelection'] = {
        onChange: (newSelectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            onChange!(SelectKeyToValue(newSelectedRowKeys, dataSource))
            setSelectedRowKeys(newSelectedRowKeys)
        },
        selectedRowKeys: selectedRowKeys
    };

    const columns: TableColumnsType<DataType> = [
        {
            key: "name",
            title: 'ชื่อ',
            dataIndex: 'name',
            render: (_, record) => dataSource.length >= 1 ? <>
                <Flex vertical gap='small'>
                    <Flex><h3>{record.name}</h3>&nbsp;&nbsp;<h4>({record.nickname})</h4></Flex>
                    <h5 style={{ opacity: '0.5' }}>{record.description}</h5>
                </Flex>
            </> : null
        }, {
            key: "position",
            title: 'ตำแหน่ง',
            dataIndex: 'position',
            render: (_, record) => dataSource.length >= 1 ? <>
                <Flex vertical gap='small'>
                    <Flex><h3>{record.position}</h3></Flex>
                </Flex>
            </> : null
        }
    ];

    return <>
        {selectedRowKeys.length > 0 && <p className="py-1 px-3 italic">selected members {selectedRowKeys.length} people.</p>}
        <Table
            className='mx-5'
            bordered
            dataSource={data}
            columns={columns}
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            pagination={false}
        />
    </>

}