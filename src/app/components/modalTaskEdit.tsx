"use client"

import React, { useMemo, useState } from "react"
import dayjs from "dayjs"

import { uploadImageUrl } from "@/api/client"
import type { Task, Person } from "@/type/task"
import { Modal, Tag, Form, Button, DatePicker, Image, Space } from "antd"
import { SelectMemberResponsible } from "@/app/components/searchMemberResponsible"

import { submittedTaskAction } from "../actions/submittedTask"
import type { UpdateTaskPayload } from "@/api/tasks"

import { Status as TaskStatus } from "@/type/task"

const { RangePicker } = DatePicker;

export interface TaskEditFormData {
    member: Person | undefined;
    range: Date[];
}

export const ModalTaskEdit: React.FC<{ task: Task }> = ({ task }) => {

    const [isModelOpen, setModelOpen] = useState(false)
    const [form] = Form.useForm<TaskEditFormData>();
    const [ errMessage , setErrMessage ] = useState<string>()

    const initialValues = {
        member: task.person,
        range: [dayjs(task.start), dayjs(task.end)],
    }


    const formLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 20 }
    }
    const imageURL = useMemo(() => {
        const value = form.getFieldValue("member")
        const defaultAvatarProfile = `${uploadImageUrl}/default-profile.jpg`
        return value?.imageURL ?? defaultAvatarProfile
    }, [form.getFieldValue("member")])

    const onFinish = async(data: TaskEditFormData) => {
        const payload: UpdateTaskPayload = {
            member_id : data.member?.id,
            start : data.range[0].toJSON(),
            end : data.range[1].toJSON(),
            status : TaskStatus.Submitted
        }
        const result = await submittedTaskAction(task.calendar_id, task.id, payload)
        
        if(result?.error){
            setErrMessage(result.error)
        }else{
            onCancel()
        }
    }

    const onCancel = () => {
        setModelOpen(false)
        form.setFieldsValue(initialValues)
    }

    return <>
        <Tag key={task.id} color={task.person?.color} onClick={() => { setModelOpen(true) }}>
            {`${task.person?.name} (${task.person?.nickname})`}
        </Tag>
        <Modal
            open={isModelOpen}
            title={`${task.description.name} ${initialValues.range[0].format("DD/MM/YYYY")}`}
            style={{ maxWidth: 600 }}
            onCancel={onCancel}
            footer={[]}
        >
            <Form
                {...formLayout}
                form={form}
                initialValues={initialValues}
                onFinish={onFinish}
            >
                <div className="py-4 flex flex-row justify-center">
                    <Image preview={false} height="200px" src={imageURL} />
                </div>
                <Form.Item label="ชื่อ" name="member">
                    <SelectMemberResponsible
                        calendarId={task.calendar_id}
                        scheduleId={task.schedule_id}
                    />
                </Form.Item>
                <Form.Item label="เวลา" name="range" rules={[{ required : false ,validator: rangeValidator} ]}>
                    <RangePicker showTime />
                </Form.Item>
                <div className="flex flex-row justify-center place-items-center">
                    <p className="text-red-400">{errMessage}</p>
                    <Space align="center">
                        <Button type="primary" htmlType="submit">แก้ไข</Button>
                        <Button danger>ลบ</Button>
                    </Space>
                </div>
            </Form>
        </Modal>
    </>
}

const rangeValidator = (_: any, value: dayjs.Dayjs[]) => {
    if ( value == null ){
        return Promise.reject(new Error("กรุณาเลือกวัน-เวลา"));
    }
    if ( Math.abs(value[0].diff(value[1], 'hour')) > 24){
        return Promise.reject(new Error('กรุณาเลือกเวลาเริ่ม - จบ ให้อยู่ระหว่าง 24 ซม.'));
    }
    
    return Promise.resolve();
}

