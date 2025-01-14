'use client'

import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, Flex, } from "antd";

import { PlusOutlined, UserAddOutlined } from '@ant-design/icons';

export default function CreateMemberFormModal() {

    const [visible, setVisible] = useState(false)
    const [isSendingCreateMember, setSendingCreateMember] = useState(false)
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
        },
        wrapperCol: {
            span: 14,
        },
    };

    const { TextArea } = Input;
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const onCancel = () => {
        setSendingCreateMember(false)
        form.resetFields()
        setVisible(false);
    }

    return <>
        <Button 
            icon={<UserAddOutlined />}
            onClick={() => {setVisible(true)}}
        >
              <h3>เพื่มสมาชิก</h3>
        </Button>
    <Modal
        open={visible}
        title="เพื่มข้อมูลสมาชิกใหม่"
        onCancel={onCancel}
    >  
        <Form {...formItemLayout} form={form} onFinish={onFinish} clearOnDestroy>
            <Form.Item required name="upload" label="รูปโปรไฟล์" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload 
                maxCount={1}
                action={MemberApi.URLUploadFile}
                listType="picture-card"
                onPreview={async (file)=> {
                console.log(MemberApi.getURLProfile(file.response.filename))
                return  MemberApi.getURLProfile(file.response.filename)
                }}
                
            >
                <button
                style={{
                    border: 0,
                    background: 'none',
                }}
                type="button"
                >
                <PlusOutlined />
                <div
                    style={{
                    marginTop: 8,
                    }}
                >
                    Upload
                </div>
                </button>
            </Upload>
            </Form.Item>
            <Form.Item required label="ชื่อ" name="name" >
            <Input />
            </Form.Item>
            <Form.Item required label="ชื่อเล่น" name="nickName" >
            <Input />
            </Form.Item>
            <Form.Item required label="หน้าที่" name="tag" initialValue="">
            <Input />
            </Form.Item>
            <Form.Item label="เบอร์โทร" name="phone" initialValue="">
            <Input />
            </Form.Item>
            <Form.Item label="อีเมลล์" name="email" initialValue="">
            <Input />
            </Form.Item>
            <Form.Item label="ไลน์ไอดี" name="line" initialValue="">
            <Input />
            </Form.Item>
            <Form.Item label="รายละเอียดเพื่มเติ่ม" name="description" initialValue="">
            <TextArea rows={4} />
            </Form.Item>
            
            <Flex gap="middle" justify="center" align='center'>
            <Form.Item>
                <Button key="submit" type="primary" htmlType='submit' loading={isSendingCreateMember} >
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
        </Modal>
    </>
}