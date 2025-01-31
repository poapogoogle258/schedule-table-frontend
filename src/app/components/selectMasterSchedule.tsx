"use client"

import React, { useState } from "react"
import { Flex, Table, TableColumnsType, Button, Pagination } from 'antd';
import type { PaginationProps, TableProps } from 'antd';
import { EditOutlined } from '@ant-design/icons'

import type { Schedule } from "@/type/schedule"
import type { Member } from "@/type/member"

import ButtonDeleteMember from "@/app/components/buttonDeleteMember"
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type DataType = {
    key: React.Key;
    name: string;
    description: string;
};

type onChangeState = (data: string) => void | undefined
type onChangeSelectMember = (data: Member[]) => void | undefined
type onChangeLockSelectMember = (data: boolean) => void | undefined

interface SelectMasterScheduleTableProp {
    dataSource: Schedule[]
    value?: string
    onChange?: onChangeState
    setSelectMember: onChangeSelectMember
    setLockSelectMembers: onChangeLockSelectMember
}

const SelectMasterScheduleTable: React.FC<SelectMasterScheduleTableProp> = ({ dataSource, value, onChange, setSelectMember, setLockSelectMembers }) => {

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
            const indexOfDataSource = dataSource.findIndex((value) => value.id == selectedRowKeys[0])
            if (indexOfDataSource == -1) {
                throw Error(`not fount key ${selectedRowKeys[0]} in dataSource`)
            }
            setSelectMember(dataSource[indexOfDataSource].members)
            setLockSelectMembers(true)
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
        {keySelected.length != 0 && <Button type="link" className="px-3" onClick={() => { SetKeySelected([]);setSelectMember([]);setLockSelectMembers(false); }} >
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

export default SelectMasterScheduleTable;