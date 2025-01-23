import React from 'react';
import type { TimePickerProps } from 'antd';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);


export default function MyTimePicker({ value, onChange }: { value?: dayjs.Dayjs , onChange?: TimePickerProps['onChange'] }) {
    const format = 'HH:mm'

    return <TimePicker value={value} onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm')} format={format} />;
}
