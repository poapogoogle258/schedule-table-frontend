'use client'

import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

const options = [
  { label: 'รายวัน', value: 3 },
  { label: 'รายสัปดาห์', value: 2 },
  { label: 'รายเดือน', value: 1 },
  { label: 'รายปี', value: 0 },
];

export default function RadioGroupFreq({ value, onChange }: { value?: number , onChange?:((e: RadioChangeEvent) => void) | undefined }) {

  return <RadioGroup options={options} value={value} onChange={onChange} />
};