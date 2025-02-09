"use client"

import React, { useCallback, useMemo, useState } from "react"
import type { Task, Person } from "@/type/task"
import { Modal, Tag, Form, Button, DatePicker, Image, Space } from "antd"
import { SelectMemberResponsible } from "@/app/components/searchMemberResponsible"

import { submittedTaskAction, type TaskEditPayload } from "../actions/submittedTaskAction"
import { Status as TaskStatus } from "@/type/task"


import dayjs from "dayjs"

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
    
    const onCancel = () => {
        setModelOpen(false)
        form.setFieldsValue(initialValues)
    }

    const formLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 20 }
    }
    const imageURL = useMemo(() => {
        const value = form.getFieldValue("member")
        return value?.imageURL ?? "https://www.vecteezy.com/free-vector/default-profile-picture"
    }, [form.getFieldValue("member")])

    const rangeValidator = (_: any, value: dayjs.Dayjs[]) => {
        if ( value == null ){
            return Promise.reject(new Error("กรุณาเลือกวัน-เวลา"));
        }

        if ( Math.abs(value[0].diff(value[1], 'hour')) > 24){
            console.log('aa')
            return Promise.reject(new Error('กรุณาเลือกเวลาเริ่ม - จบ ให้อยู่ระหว่าง 24 ซม.'));
        }

        
        return Promise.resolve();
    }

    const onFinish = async(data: TaskEditFormData) => {
        const payloads: TaskEditPayload = {
            member_id : data.member?.id,
            start : data.range[0].toJSON(),
            end : data.range[1].toJSON(),
            status : TaskStatus.Submitted
        }
        const result = await submittedTaskAction(task.calendar_id, task.id, payloads)
        
        if(result?.error){
            setErrMessage(result.error)
        }else{
            onCancel()
        }

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

