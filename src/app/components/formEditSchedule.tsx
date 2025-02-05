'use client'

import React from 'react';

import { Form, Input,Flex,Button,InputNumber } from 'antd';
import UploadProfile from "@/app/components/uploadProfile"

import { uploadImageUrl } from '@/api/client';
import MyDatePicker  from '@/app/components/datePicker';
import MyTimePicker from './timePicker';

import type { Schedule } from '@/api/schedules';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs'
dayjs().format()

import CheckboxGroupMonth from '@/app/components/checkboxGroupMonth';
import CheckboxGroupDay from "@/app/components/checkboxGroupDay"
import RadioGroupFreq from "@/app/components/radioGroupFreq"

const { TextArea } = Input;


interface FormScheduleProps {
    schedule: Schedule;
}

interface ScheduleForm {
    imageURL: string;
    name: string;
    description: string;
    priority: number;
    start: Dayjs | undefined;
    end: Dayjs | undefined;
    hr_start: Dayjs | undefined;
    hr_end: Dayjs | undefined;
    breaktime: number;
    freq: number;
    count: number | undefined;
    interval: number;
    byweekday: number[];
    bymonth: number[];

}

function convertScheduleToForm(schedule: Schedule): ScheduleForm {

    const [ h_start, m_start  ] = schedule.hr_start.split(':')
    const [ h_end, m_end  ] = schedule.hr_end.split(':')

    return {
        "imageURL": schedule.imageURL,
        "name":schedule.name,
        "description": schedule.description,
        "priority": schedule.priority,
        "start": dayjs(schedule.start),
        "end": dayjs(schedule?.end) ?? undefined,
        "hr_start": dayjs().hour(Number(h_start)).minute(Number(m_start)).second(0),
        "hr_end": dayjs().hour(Number(h_end)).minute(Number(m_end)).second(0),
        "breaktime": schedule.breaktime,
        "freq": schedule.recurrence.freq,
        "count": schedule.recurrence.count,
        "interval": schedule.recurrence.interval,
        "byweekday": schedule.recurrence.byweekday,
        "bymonth": schedule.recurrence.bymonth
    }
}

const FormEditSchedule: React.FC<FormScheduleProps> = ({schedule}) => {

    const [form] = Form.useForm();

    const initDataForm = convertScheduleToForm(schedule)

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

    const onFinish = (values: any) => {
        console.log(values);
    };

    return <Form {...formItemLayout} form={form} onFinish={onFinish} initialValues={initDataForm}>
        <Form.Item required label="โปรไฟล์" name="imageURL">
            <UploadProfile />
        </Form.Item>
        <Form.Item required label="ชื่อ" name="name">
            <Input />
        </Form.Item>
        <Form.Item label="ระดับความสำคัญ" name="priority" >
            <InputNumber />
        </Form.Item>
        <Form.Item label="วันที่เริ่มต้น" name="start" >
            <MyDatePicker/>
        </Form.Item>
        <Form.Item label="วันสุดท้าย" name="end" >
            <MyDatePicker/>
        </Form.Item>
        <Form.Item label="เวลาเริ่ม" name="hr_start" >
            <MyTimePicker/>
        </Form.Item>
        <Form.Item label="เวลาจบ" name="hr_end" >
            <MyTimePicker/>
        </Form.Item>
        <Form.Item label="เวลาพักขั้นตํ่าหลังออกเวร(นาที)" name="breaktime" >
            <InputNumber/>
        </Form.Item>
        <Form.Item label="รายละเอียดเพื่มเติ่ม" name="description">
            <TextArea rows={4} />
        </Form.Item>
        
        <Form.Item label="freq" name="freq">
            <RadioGroupFreq/>
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
            <InputNumber placeholder='ไม่มีกำหนด'/>
        </Form.Item>


        <Flex gap="middle" justify="center" align='center'>
            <Form.Item>
                <Button key="submit" type="primary" htmlType='submit'>
                    บันทึก
                </Button>
            </Form.Item>
            <Form.Item>
                <Button htmlType="button" onClick={onCancel}>
                    ยกเลิก
                </Button>
            </Form.Item>
            <Form.Item>
                <Button danger htmlType="button" onClick={onCancel}>
                    ลบข้อมูล
                </Button>
            </Form.Item>
        </Flex>
        </Form>
};

export default FormEditSchedule;

