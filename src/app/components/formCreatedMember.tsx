'use client'

import React from "react";
import { Button, Form, Input, Flex, Upload} from "antd";

import {uploadImageUrl} from "@/api/client"

import UploadProfile from "@/app/components/uploadProfile"

const { TextArea } = Input;


export default function FormCreatedMember() {
    const [form] = Form.useForm();

    const initDataForm = {
        "imageURL": `${uploadImageUrl}/default-profile.jpg`,
        "name": "",
        "nickname": "",
        "description": "",
        "phone": "",
        "email": "",
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
            <UploadProfile/>
        </Form.Item>
        <Form.Item required label="ชื่อ" name="name">
            <Input />
        </Form.Item>
        <Form.Item required label="ชื่อเล่น" name="nickname">
            <Input />
        </Form.Item>
        <Form.Item label="เบอร์โทร" name="phone" >
            <Input />
        </Form.Item>
        <Form.Item label="อีเมลล์" name="email" >
            <Input />
        </Form.Item>
        <Form.Item label="รายละเอียดเพื่มเติ่ม" name="description">
            <TextArea rows={4} />
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
        </Flex>
    </Form>

}