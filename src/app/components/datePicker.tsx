'use client'

import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';

export default function MyDatePicker({ value, onChange }: { value?: DatePickerProps<Dayjs>['value'], onChange?: DatePickerProps<Dayjs>['onChange'] }){
    return <DatePicker value={value} onChange={onChange} needConfirm />;
} 
