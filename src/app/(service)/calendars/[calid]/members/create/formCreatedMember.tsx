'use client'

import React, { useState } from "react";

import { Button, Form, Input, Flex, ColorPicker } from "antd";

import { useParams, useRouter } from "next/navigation";
import { uploadImageUrl } from "@/api/client"
import UploadProfile from "@/app/components/uploadProfile"

import { createMemberAction } from "@/app/actions/createMember";
import { type CreateMemberPayload } from "@/api/members";


const { TextArea } = Input;

const defaultProfileUser = `${uploadImageUrl}/default-profile.jpg`

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

interface CreateDataFrom {
    imageURL: string
    name: string
    nickname: string
    description: string
    telephone: string
    email: string
    color: string
    position: string
}


export default function FormCreatedMember() {
    const { calid } = useParams<{ calid: string }>()
    const [form] = Form.useForm<CreateDataFrom>();
    const router = useRouter()
    const [padding, setPadding] = useState(false)
    const [errMessage, setErrMessage] = useState<string>()

    const initDataForm: CreateDataFrom = {
        "imageURL": defaultProfileUser,
        "name": "",
        "nickname": "",
        "description": "",
        "telephone": "",
        "email": "",
        "color": "#000000",
        "position": ""
    }

    async function onFinish(formData: CreateDataFrom) {
        setPadding(true)

        const payload: CreateMemberPayload = formData
        const result = await createMemberAction(calid, payload)

        if (result?.error) {
            setErrMessage(result.error)
        }

        setPadding(false)
    }

    const onCancel = () => {
        form.setFieldsValue(initDataForm)
        router.push(`/calendars/${calid}/members`)

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

        <div className={`py-5 text-red-700 flex flex-row justify-self-center`}>
            {errMessage}
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