'use client'

import type { RadioChangeEvent } from 'antd';
import { Input, Radio } from 'antd';

const RadioGroup = Radio.Group;

const options = [
  { label: 'รายวัน', value: 0 },
  { label: 'รายสัปดาห์', value: 1 },
  { label: 'รายเดือน', value: 2 },
  { label: 'รายปี', value: 3 },
];

export default function RadioGroupFreq({ value, onChange }: { value?: number , onChange?:((e: RadioChangeEvent) => void) | undefined }) {

  return <RadioGroup options={options} value={value} onChange={onChange} />
};