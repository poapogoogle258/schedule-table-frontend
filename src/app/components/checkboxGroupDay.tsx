'use client'

import React from 'react';
import { Checkbox } from 'antd';
import type { GetProp } from 'antd';

const CheckboxGroup = Checkbox.Group;

const options = [
  { label: 'วันจันทร์', value: 0 },
  { label: 'วันอังคาร', value: 1 },
  { label: 'วันพุธ', value: 2 },
  { label: 'วันพฤหัสบดี', value: 3 },
  { label: 'วันศุกร์', value: 4 },
  { label: 'วันเสาร์', value: 5 },
  { label: 'วันอาทิตย์', value: 6 },

];

export default function checkboxGroupDay({ value, onChange }: { value?: string[], onChange?: GetProp<typeof Checkbox.Group, 'onChange'> }) {

  return <CheckboxGroup options={options} value={value} onChange={onChange} />
};