import React, { useState } from "react";

import { Button, Flex, Upload } from "antd";

import { LoadingOutlined } from '@ant-design/icons';
import { uploadImageUrl } from "@/api/client"

import { UploadOutlined } from '@ant-design/icons';

import type { GetProp, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


export default function UploadProfile({ value, onChange }: { value?: string, onChange?: React.Dispatch<React.SetStateAction<string>> }) {

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            setMessage('You can only upload JPG/PNG file!');
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            setMessage('Image must smaller than 10MB!');
        }

        if (message != "") {
            setMessage("")
        }
        return isJpgOrPng && isLt10M;
    };

    const handleChange: UploadProps['onChange'] = (info) => {


        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            const url: string = info.file.response?.data?.url
            onChange!(url)
            setLoading(false)
        }
    };

    return <Flex gap={10} vertical justify="center" align="left">

        <img src={value} alt="avatar" style={{ width: '128px', height: '128px', 'border' : 'groove', 'borderColor' : "##dadada" }} />
        <Upload
            name="avatar"
            showUploadList={false}
            action={uploadImageUrl}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {message && <div className="to-red-400" >{message}</div>}
            <Button icon={loading ? <LoadingOutlined /> : <UploadOutlined />}>Upload</Button>
        </Upload>
    </Flex>

}