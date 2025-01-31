'use client'
import React, { useState } from 'react';

import { Button, Card, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';

import type { Schedule } from '@/type/schedule';

interface CardScheduleProps {
    schedule: Schedule;
}

interface ButtonModalDeleteProps {
    scheduleId: string
    calendarId: string
    name: string
}

const ButtonLinkEdit: React.FC<{ calendarId: string, scheduleId: string }> = ({ calendarId, scheduleId }) => {
    return (
        <Link href={`/calendars/${calendarId}/schedules/${scheduleId}`}>
            <Button
                type='text'
                icon={<EditOutlined />}>
            </Button>
        </Link>
    )
}

const ButtonModalDelete: React.FC<ButtonModalDeleteProps> = ({ scheduleId, calendarId, name }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button
                danger
                type='text'
                onClick={() => { setIsModalOpen(true) }}
                icon={<DeleteOutlined />}
            />
            <Modal 
                open={isModalOpen} onOk={handleOk} 
                title={`ต้องการลบเวร ${name} หรือไม่`} 
                onCancel={handleCancel} 
            >
                <p>คำเตือน</p>
                <p>1. หากลบแล้วเวรต่างที่ถูกจัดขึ้นมาจะถูกยกเลิก</p>
                <p>2. หากลบแล้วข้อมูลทุกอย่างจะไม่สามารถกลับมาได้</p>
            </Modal>
        </>
    )
}

const CardSchedule: React.FC<CardScheduleProps> = ({ schedule }) => {
    const coverImage = schedule.imageURL ? (
        <img
            alt={schedule.name}
            src={schedule.imageURL}
            style={{
                height: 200,
                objectFit: 'cover',
            }}
        />

    ) : null;

    const actions: React.ReactNode[] = [
        <ButtonLinkEdit calendarId={schedule.calendar_id} scheduleId={schedule.id} />,
        <ButtonModalDelete calendarId={schedule.calendar_id} scheduleId={schedule.id} name={schedule.name} />,
    ];

    return (
        <Card
            title={schedule.name}
            bordered={false}
            style={{ width: 300 }}
            cover={coverImage}
            actions={actions}
        >
            <p>{schedule.description}</p>
            <p>{schedule.members?.length ?? 0} คน</p>
        </Card>
    );
};

export default CardSchedule;