'use client'

import React, { useState, useRef, FormEvent } from 'react';

import { Form, Input, Flex, Button, InputNumber, Pagination } from 'antd';
import type { ButtonProps, FormProps } from 'antd';
import UploadProfile from "@/app/components/uploadProfile"

import { uploadImageUrl } from '@/api/client';
import MyDatePicker from '@/app/components/datePicker';
import MyTimePicker from '../../../../components/timePicker';

import type { Dayjs } from 'dayjs';
import type { Schedule } from '@/type/schedule';
import type { Member } from '@/type/member';

import CheckboxGroupMonth from '@/app/components/checkboxGroupMonth';
import CheckboxGroupDay from "@/app/components/checkboxGroupDay"
import RadioGroupFreq from "@/app/components/radioGroupFreq"
import SelectMemberTable from "@/app/components/selectMemberTable"
import SelectScheduleTable from '@/app/components/selectMasterSchedule';

const { TextArea } = Input;

interface FormCreateScheduleProps {
    members: Member[],
    schedules: Schedule[]
}

interface ScheduleFormData {
    imageURL: string
    name: string
    description: string
    priority: number
    start: Dayjs
    end: Dayjs | undefined
    hr_start: string
    hr_end: string
    breaktime: number
    freq: number
    count: undefined
    interval: number
    byweekday: number[]
    bymonth: number[]
    scheduleMasterId: string | undefined
    members: Member[] | undefined
}

const FormCreateSchedule: React.FC<FormCreateScheduleProps> = ({ members, schedules }) => {
    const [form] = Form.useForm();
    const Steps = ["Step 1 of 3: ข้อมูลทั่วไป", "Step 2 of 3: ระยะเวลา", "Step 3 of 3: จัดการสมาชิก"]
    const [pageForm, setPageForm] = useState(1)

    const buttonSubmit = useRef<HTMLButtonElement>(null)

    const initDataForm = {
        "imageURL": `${uploadImageUrl}/default-image-schedule.jpeg`,
        "name": "",
        "description": "",
        "priority": 1,
        "start": undefined,
        "end": undefined,
        "hr_start": undefined,
        "hr_end": undefined,
        "breaktime": 0,
        "freq": 1,
        "count": undefined,
        "interval": 1,
        "byweekday": [],
        "bymonth": [],
        "scheduleMasterId": "",
        "members": []
    }

    // const initDataForm = {
    //     "imageURL": "http://localhost:8080/upload/1738248143095287.png",
    //     "name": "test",
    //     "priority": 1,
    //     "start": "2025-01-29T17:00:00.000Z",
    //     "end": "2026-01-29T17:00:00.000Z",
    //     "hr_start": "2025-01-30T11:00:00.000Z",
    //     "hr_end": "2025-01-30T00:00:00.000Z",
    //     "breaktime": 480,
    //     "description": "เวรกลางคืนนนนนนนนน",
    //     "freq": 0,
    //     "interval": 1,
    //     "byweekday": [
    //         0,
    //         1,
    //         2,
    //         3,
    //         4,
    //         5,
    //         6
    //     ],
    //     "bymonth": [],
    // }

    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 14,
        },
    };

    const onCancel = () => {
        form.setFieldsValue(initDataForm)
    }

    const onFinish = (values: ScheduleFormData) => {
        console.log(values);
    };

    return <>

        <div className='my-5 flex justify-between'>
            <h1 className='font-bold text-xl'>{Steps[pageForm - 1]}</h1>
            <div className='grid auto-cols-max grid-flow-col gap-3 '>
                {pageForm != 1 && <Button onClick={() => { setPageForm(pageForm - 1) }}>กลับ</Button>}
                {pageForm != 3 && <Button onClick={() => { setPageForm(pageForm + 1) }}>ต่อไป</Button>}
                {pageForm == 3 && <Button key="submit" type="primary" htmlType='submit' onClick={() => {
                    buttonSubmit.current?.click()
                }}>บันทึก</Button>}
            </div>
        </div>

        <Form {...formItemLayout} form={form} onFinish={onFinish} initialValues={initDataForm}>

            <div className={pageForm == 1 ? '' : 'hidden'}>
                <Form.Item required label="โปรไฟล์" name="imageURL">
                    <UploadProfile />
                </Form.Item>
                <Form.Item required label="ชื่อ" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="รายละเอียด" name="description">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="ระดับความสำคัญ" name="priority">
                    <InputNumber />
                </Form.Item>
            </div>

            <div className={pageForm == 2 ? '' : 'hidden'}>
                <Form.Item label="เวลาพักขั้นตํ่าหลังออกเวร(นาที)" name="breaktime">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="วันที่เริ่มต้น" name="start">
                    <MyDatePicker />
                </Form.Item>
                <Form.Item label="วันสุดท้าย" name="end">
                    <MyDatePicker />
                </Form.Item>
                <Form.Item label="เวลาเริ่ม" name="hr_start">
                    <MyTimePicker />
                </Form.Item>
                <Form.Item label="เวลาจบ" name="hr_end">
                    <MyTimePicker />
                </Form.Item>
                <Form.Item label="count" name="count">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="freq" name="freq">
                    <RadioGroupFreq />
                </Form.Item>
                <Form.Item label="interval" name="interval">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="byweekday" name="byweekday">
                    <CheckboxGroupDay />
                </Form.Item>
                <Form.Item label="bymonth" name="bymonth">
                    <CheckboxGroupMonth />
                </Form.Item>
            </div>

            <div className={pageForm == 3 ? '' : 'hidden'}>
                <Form.Item label="scheduleMaster" name="scheduleMaster">
                    <SelectScheduleTable dataSource={schedules} />
                </Form.Item>
                <Form.Item label="members" name="members">
                    <SelectMemberTable dataSource={members} />
                </Form.Item>
            </div>

            <Form.Item hidden={true}>
                <Button ref={buttonSubmit} key="submit" type="primary" htmlType='submit' />
            </Form.Item>
        </Form>

    </>

};

export default FormCreateSchedule;

