import React, { useState } from 'react';
import type { TimePickerProps } from 'antd';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

interface MyTimePickerProps {
    value?: string | undefined
    onChange?: (data : string) => void
}

const MyTimePicker: React.FC<MyTimePickerProps> = ({ value, onChange }) => {
    
    const format = 'HH:mm'
    const [date , setDate] = useState<dayjs.Dayjs | null>(value ? dayjs(value, format) : null)

    const timePicker: TimePickerProps['onChange'] = (date) => {
        setDate(date)
        onChange!(date.format(format))
    }

    return <TimePicker value={date} onChange={timePicker} defaultOpenValue={dayjs('00:00:00', 'HH:mm')} format={format} />;
}


export default MyTimePicker
