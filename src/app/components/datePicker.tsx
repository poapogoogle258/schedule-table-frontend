'use client'

import React, { useState } from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

interface MyDatePickerProps {
    value?: string | null,
    onChange?: (data: string | null) => void
}

const MyDatePicker: React.FC<MyDatePickerProps> = ({ value, onChange }) => {

    const selectDate = value ? dayjs(value!) : null
    const [date , setDate ] = useState<DatePickerProps<Dayjs>['value']>(selectDate)

    const DatePickerOnChange: DatePickerProps<Dayjs>['onChange'] = (value) => {
        setDate(value)
        onChange!(value?.format() || null)
    }

    return <DatePicker value={date} onChange={DatePickerOnChange} needConfirm />;
}

export default MyDatePicker;
