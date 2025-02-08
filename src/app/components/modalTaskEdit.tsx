"use client"

import React, { useState } from "react"
import type { Task } from "@/type/task"
import { Modal, Tag, Form, Button, Input, DatePicker, Image, Space } from "antd"

import dayjs from "dayjs"

const { Search } = Input;
const { RangePicker } = DatePicker;

export const ModalTaskEdit: React.FC<{ task: Task }> = ({ task }) => {

    const [isModelOpen, setModelOpen] = useState(false)

    const [form] = Form.useForm();

    const onCancel = () => {
        setModelOpen(false)
    }

    const formLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 20 }
    }


    const initialValues = {
        member_id: task.person.id,
        name: `${task.person.name} (${task.person.nickname})`,
        range: [dayjs(task.start), dayjs(task.end)],
        status: 0
    }

    const onFinish = (data: FormData) => {
        console.log(data)
    }


    return <>
        <Tag key={task.id} color={task.person.color} onClick={() => { setModelOpen(true) }}>
            {`${task.person.name} (${task.person.nickname})`}
        </Tag>
        <Modal
            open={isModelOpen}
            title={`${task.description.name} ${initialValues.range[0].format("DD/MM/YYYY")}`}
            style={{ maxWidth: 600}}
            onCancel={onCancel}
            footer={[]}
        >
            <div className="container py-4 flex flex-row justify-center">
                <Image preview={false} height="200px" src={task.person.imageURL} />
            </div>
            <Form
                {...formLayout}
                form={form}
                initialValues={initialValues}
                onFinish={onFinish}

            >
                <Form.Item label="ชื่อ" name="name">
                    <Search placeholder="input search loading default" value={initialValues.name} />
                </Form.Item>
                <Form.Item label="เวลา" name="range">
                    <RangePicker showTime />
                </Form.Item>
                <div className="flex flex-row justify-center place-items-center">
                    <Space align="center">
                        <Button type="primary" htmlType="submit">แก้ไข</Button>
                        <Button danger>ลบ</Button>
                    </Space>
                </div>
            </Form>
        </Modal>
    </>
}