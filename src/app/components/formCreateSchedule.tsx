'use client'

import React from 'react';

import { Form, Input,Flex,Button,InputNumber } from 'antd';
import UploadProfile from "@/app/components/uploadProfile"

import { uploadImageUrl } from '@/api/client';
import MyDatePicker  from '@/app/components/datePicker';
import MyTimePicker from './timePicker';

import type { Dayjs } from 'dayjs';
import type { Schedule } from '@/api/schedules';

import CheckboxGroupMonth from '@/app/components/checkboxGroupMonth';
import CheckboxGroupDay from "@/app/components/checkboxGroupDay"
import RadioGroupFreq from "@/app/components/radioGroupFreq"

const { TextArea } = Input;

const FormCreateSchedule: React.FC = () => {
    const [form] = Form.useForm();

    const initDataForm = {
        "imageURL": `${uploadImageUrl}/default-image-schedule.jpeg`,
        "name":"",
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
        "bymonth": []
    }

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
            <InputNumber />
        </Form.Item>
        <Form.Item label="รายละเอียดเพื่มเติ่ม" name="description">
            <TextArea rows={4} />
        </Form.Item>
        

        <Form.Item label="count" name="count">
            <InputNumber />
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

export default FormCreateSchedule;

