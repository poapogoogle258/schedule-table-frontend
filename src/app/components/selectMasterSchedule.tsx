"use client"

import React, { useState } from "react"
import { Table, TableColumnsType, Button } from 'antd';
import type { TableProps } from 'antd';

import type { Schedule } from "@/type/schedule"
import type { Member } from "@/type/member"


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
    except?: string
}

const SelectMasterScheduleTable: React.FC<SelectMasterScheduleTableProp> = ({ dataSource, value, onChange, setSelectMember, setLockSelectMembers, except }) => {

    const data = dataSource.filter((item) => item.master_id == null && item.id != except!).map((item, index) => ({
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
            width: "100%",
            render: (_, record) => dataSource.length >= 1 ? <>
                <div className='max-w-xs flex flex-col'>
                    <h3>{record.name}&nbsp;({record.name})</h3>
                    <h5 className="line-clamp-3 break-words" style={{ opacity: '0.5' }}>{record.description}</h5>
                </div>
            </> : null
        }
    ];

    return <>
        <Button disabled={keySelected.length === 0} type="link" onClick={() => { SetKeySelected([]); setSelectMember([]); setLockSelectMembers(false); }} >
            <p className="font-thin italic text-blue-500 hover:text-blue-800">
                cancel
            </p>
        </Button>
        <Table
            bordered
            dataSource={data}
            columns={columns}
            pagination={false}
            rowSelection={{ type: 'radio', ...rowSelection }}
        />
    </>


}

export default SelectMasterScheduleTable;