import React from 'react';
import { Card } from 'antd';
import type { Schedule } from '@/api/schedules';

interface CardScheduleProps {
    schedule: Schedule;
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

    return (
        <Card 
            title={schedule.name} 
            bordered={false} 
            style={{ width: 300 }}
            cover={coverImage}
        >
            <p>{schedule.description}</p>
            <p>{schedule.members?.length ?? 0} คน</p>
        </Card>
    );
};

export default CardSchedule;