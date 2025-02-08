'use client'

import React, { useState, useRef, useCallback } from 'react';

import { Form, Input, Button, InputNumber } from 'antd';
import UploadProfile from "@/app/components/uploadProfile"
import { useParams } from 'next/navigation';

import { uploadImageUrl } from '@/api/client';
import MyDatePicker from '@/app/components/datePicker';
import MyTimePicker from '@/app/components/timePicker';

import type { Dayjs } from 'dayjs';
import type { Schedule } from '@/type/schedule';
import type { Member } from '@/type/member';

import CheckboxGroupMonth from '@/app/components/checkboxGroupMonth';
import CheckboxGroupDay from "@/app/components/checkboxGroupDay"
import RadioGroupFreq from "@/app/components/radioGroupFreq"
import SelectMemberTable from "@/app/components/selectMemberTable"
import SelectScheduleTable from '@/app/components/selectMasterSchedule';
import dayjs from 'dayjs';

import ActionCreateSchedule from "./actionCreateSchedule"

const { TextArea } = Input;


const defaultImageSchedule = `${uploadImageUrl}/default-image-schedule.jpeg`

interface FormCreateScheduleProps {
    members: Member[],
    schedules: Schedule[]
}

export interface ScheduleFormData {
    imageURL: string
    name: string
    description: string
    priority: number
    start: string | null
    end: string | null
    hr_start: string | null
    hr_end: string | null
    breaktime: number
    freq: number
    count: number | null
    interval: number
    byweekday: number[]
    bymonth: number[]
    master_id: string | null
    members: Member[] | null
    use_number_people: number
}


const FormCreateSchedule: React.FC<FormCreateScheduleProps> = ({ members, schedules }) => {

    const { calid } = useParams<{ calid: string }>()
    const [form] = Form.useForm();
    const [pageForm, setPageForm] = useState(1)


    const [lockSelectMembers, setLockSelectMembers] = useState(false)
    const buttonSubmit = useRef<HTMLButtonElement>(null)

    const initDataForm: ScheduleFormData = {
        "imageURL": defaultImageSchedule,
        "name": "",
        "description": "",
        "priority": 1,
        "start": null,
        "end": null,
        "hr_start": null,
        "hr_end": null,
        "breaktime": 0,
        "freq": 3,
        "count": null,
        "interval": 1,
        "byweekday": [],
        "bymonth": [],
        "master_id": null,
        "members": [],
        "use_number_people": 1
    }

    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 14,
        },
    };

    const setSelectMember = (data: Member[]) => {
        form.setFieldValue('members', data);
    }

    const Steps = ["Step 1 of 3: ข้อมูลทั่วไป", "Step 2 of 3: ระยะเวลา", "Step 3 of 3: จัดการสมาชิก"]

    const onFinish = async (formData: ScheduleFormData) => {
        const result = await ActionCreateSchedule(calid, formData)
    };

    const validator = {
        "imageURL": (_: any, value: string) => {
            if (value !== defaultImageSchedule) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('กรุณา upload รูปภาพก่อน'));
        },
        "start": (_: any, value: Dayjs) => {
            const now = dayjs()
            if (!value) {
                return Promise.reject(new Error("เลือกวันเริ่มต้น"));
            }
            else if (now.isAfter(value, 'date')) {
                return Promise.reject(new Error("เลือกวันเริ่มต้นได้ตั้งแต่วันนี้เป็นต้นไป"));
            }
            return Promise.resolve()
        },
        "hr_end": (_: any, value: string) => {
            if (value == undefined) {
                return Promise.reject(new Error("กรุณาระบุเวลาสิ้นสุด"))
            }
            else if (value == form.getFieldValue("hr_start")) {
                return Promise.reject(new Error("เวลาเริ่มกับเวลาสิ่นสุดห้ามเหมือนกันไม่เกิน 24 ชั่วโมง"))
            }

            return Promise.resolve()
        },
        "members": (_: any, value: Member[]) => {
            if (value.length == 0) {
                return Promise.reject(new Error("กรุณาเลือกสมาชิกเริ่มต้นอย่างน้อย 1 คน"))
            }
            return Promise.resolve()
        }
    }

    const validatePageForm = async (pageForm: number) => {
        const labelForm = [
            ["name", "imageURL", "description", "priority"],
            ["start", "end", "hr_start", "hr_end", "breaktime", "freq", "count", "interval", "byweekday", "bymonth", "use_number_people"],
            ["scheduleMasterId", "members"]
        ]

        try {
            await form.validateFields(labelForm[pageForm - 1])
            return true
        } catch (error) {
            return false
        }
    }

    const nextPage = async () => {
        if (await validatePageForm(pageForm)) {
            setPageForm(pageForm + 1)
        }
    }

    const lastPage = async () => {
        setPageForm(pageForm - 1)
    }

    return <>
        <div className='my-5 flex justify-between'>
            <h1 className='font-bold text-xl'>{Steps[pageForm - 1]}</h1>
            <div className='grid auto-cols-max grid-flow-col gap-3 '>
                {pageForm != 1 && <Button onClick={lastPage}>กลับ</Button>}
                {pageForm != 3 && <Button onClick={nextPage}>ต่อไป</Button>}
                {pageForm == 3 && <Button key="submit" type="primary" htmlType='submit' onClick={() => {
                    buttonSubmit.current?.click()
                }}>บันทึก</Button>}
            </div>
        </div>

        <Form {...formItemLayout} form={form} onFinish={onFinish} initialValues={initDataForm}>
            <div className={pageForm == 1 ? '' : 'hidden'}>
                <Form.Item required label="โปรไฟล์" name="imageURL" rules={[{ required: true, validator: validator['imageURL'] }]}>
                    <UploadProfile />
                </Form.Item>
                <Form.Item label="ชื่อ" name="name" rules={[{ required: true, message: "กรุณาใส่ชื่อ" }]}>
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
                <Form.Item label="วันที่เริ่มต้น" name="start" rules={[{ required: true, validator: validator['start'] }]}>
                    <MyDatePicker />
                </Form.Item>
                <Form.Item label="วันสุดท้าย" name="end">
                    <MyDatePicker />
                </Form.Item>
                <Form.Item label="เวลาเริ่ม" name="hr_start" rules={[{ required: true, message: "กรุณาเวลาเริ่มต้น" }]}>
                    <MyTimePicker />
                </Form.Item>
                <Form.Item label="เวลาจบ" name="hr_end" rules={[{ required: true, validator: validator['hr_end'] }]}>
                    <MyTimePicker />
                </Form.Item>
                <Form.Item label="เวลาพักขั้นตํ่าหลังออกเวร(นาที)" name="breaktime">
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
                <Form.Item label="count" name="count">
                    <InputNumber placeholder='ไม่ระบุ' />
                </Form.Item>
            </div>


            <div className={pageForm == 3 ? '' : 'hidden'}>
                <Form.Item label="จำนวนเข้าเวรครั้งละ" name="use_number_people">
                    <InputNumber/>
                </Form.Item>
                <Form.Item label="scheduleMaster" name="master_id">
                    <SelectScheduleTable
                        dataSource={schedules}
                        setSelectMember={setSelectMember}
                        setLockSelectMembers={setLockSelectMembers}
                    />
                </Form.Item>
                <Form.Item label="members" name="members" rules={[{ required: true, message: "" }]}>
                    <SelectMemberTable
                        dataSource={members}
                        lockSelectMembers={lockSelectMembers}
                    />
                </Form.Item>
            </div>

            <Form.Item hidden={true}>
                <Button ref={buttonSubmit} key="submit" type="primary" htmlType='submit' />
            </Form.Item>
        </Form>

    </>

};

export default FormCreateSchedule;

