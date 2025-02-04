'use client'

import React, { useState } from "react";

// import { z } from "zod"
import { Button, Form, Input, Flex, ColorPicker } from "antd";

import { useParams } from "next/navigation";

import { uploadImageUrl } from "@/api/client"
import UploadProfile from "@/components/uploadProfile"
import createNewMemberAction from './actionCreateMember'

import type { FormDataMember } from "@/type/form"

const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const initDataForm = {
    "imageURL": `${uploadImageUrl}/default-profile.jpg`,
    "name": "",
    "nickname": "",
    "description": "",
    "phone": "",
    "email": "",
    "color": "#000000",
    "position": ""
}

export default function FormCreatedMember() {
    const { calid } = useParams<{ calid: string }>()
    const [form] = Form.useForm();
    const [padding, setPadding] = useState(false)
    const [message, setMessage] = useState({ color: 'text-red-700', text: '' })

    const onCancel = () => {
        form.setFieldsValue(initDataForm)
    }

    async function onFinish(formData: FormDataMember) {
        setPadding(true)
        const resp = await createNewMemberAction(calid, formData)
        if (resp?.error) {
            setMessage({ color: 'text-red-700', text: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" })
        } else {
            setMessage({ color: 'text-green-700', text: "ลงทะเบียนเรียบร้อย" })
        }
        setPadding(false)
    }

    return <Form {...formItemLayout} form={form} onFinish={onFinish} initialValues={initDataForm}>
        <Form.Item required label="โปรไฟล์" name="imageURL">
            <UploadProfile />
        </Form.Item>
        <Form.Item required label="ชื่อ" name="name">
            <Input placeholder="name" />
        </Form.Item>
        <Form.Item required label="ชื่อเล่น" name="nickname">
            <Input placeholder="nickname" />
        </Form.Item>
        <Form.Item required label="ตำแหน่ง" name="position">
            <Input placeholder="position" />
        </Form.Item>
        <Form.Item label="สีชื่อ" name="color" getValueFromEvent={(color) => {
            return "#" + color.toHex();
        }}>
            <ColorPicker disabledAlpha />
        </Form.Item>
        <Form.Item label="เบอร์โทร" name="phone" rules={[{ pattern: new RegExp("^[0-9]{10}$"), message: 'กรุณากรอกเบอร์โทร', whitespace: true }]}>
            <Input placeholder="081000000" />
        </Form.Item>
        <Form.Item label="อีเมลล์" name="email" rules={[{ type: 'email', message: 'กรุณากรอกอีเมลล์' }]}>
            <Input placeholder="user@gmail.com" />
        </Form.Item>
        <Form.Item label="รายละเอียดเพื่มเติ่ม" name="description">
            <TextArea placeholder="..." rows={4} />
        </Form.Item>

        <div className={`${message.color} felx justify-self-center py-5`}>
            {message.text}
        </div>

        <Flex gap="middle" justify="center" align='center'>
            <Form.Item>
                <Button key="submit" type="primary" htmlType='submit' loading={padding}>
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