'use client'

import React from 'react';
import { Checkbox } from 'antd';
import type { GetProp } from 'antd';

const CheckboxGroup = Checkbox.Group;

const options = [
  { label: 'วันอาทิตย์', value: 0 },
  { label: 'วันจันทร์', value: 1 },
  { label: 'วันอังคาร', value: 2 },
  { label: 'วันพุธ', value: 3 },
  { label: 'วันพฤหัสบดี', value: 4 },
  { label: 'วันศุกร์', value: 5 },
  { label: 'วันเสาร์', value: 6 },
];

export default function checkboxGroupDay({ value, onChange }: { value?: string[], onChange?: GetProp<typeof Checkbox.Group, 'onChange'> }) {

  return <CheckboxGroup options={options} value={value} onChange={onChange} />
};