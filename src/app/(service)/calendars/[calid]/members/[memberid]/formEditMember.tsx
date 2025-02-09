'use client'

import React, { useState } from "react";

import { Button, Form, Input, Flex, ColorPicker } from "antd";
import UploadProfile from "@/app/components/uploadProfile"
import { useRouter, useParams } from 'next/navigation'

import actionEditMember from '../../../../../actions/editMember'
import type { Member } from "@/type/member"
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

export default function FormEditMember({ member }: { member: Member }) {
    const { calid, memberid } = useParams<{ calid: string, memberid: string }>()
    const [form] = Form.useForm();
    const [padding, setPadding] = useState(false)
    const [message, setMessage] = useState({ color: 'text-red-700', text: '' })

    const router = useRouter()

    const initDataForm = {
        "imageURL": member.imageURL,
        "name": member.name,
        "nickname": member.nickname,
        "description": member.description,
        "telephone": member.telephone,
        "email": member.email,
        "color": member.color,
        "position": member.position
    }

    const onCancel = () => {
        form.setFieldsValue(initDataForm)

        router.push(`/calendars/${calid}/members`)
    }

    async function onFinish(formData: FormDataMember) {
        setPadding(true)
        const resp = await actionEditMember(calid, memberid, formData)
        if (resp?.error) {
            setMessage({ color: 'text-red-700', text: resp.error })
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
        <Form.Item label="เบอร์โทร" name="telephone" rules={[{ pattern: new RegExp("^[0-9]{10}$"), message: 'กรุณากรอกเบอร์โทร', whitespace: true }]}>
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
                <Button htmlType="button" onClick={onCancel} >
                    ยกเลิก
                </Button>
            </Form.Item>
        </Flex>
    </Form>

}