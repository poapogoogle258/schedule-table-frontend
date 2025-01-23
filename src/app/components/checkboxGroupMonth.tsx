'use client'

import React from 'react';
import { Checkbox, Col, Row } from 'antd';
import type { GetProp } from 'antd';

const CheckboxGroup = Checkbox.Group;

const options = [
  { label: 'มกราคม', value: 0 },
  { label: 'กุมภาพันธ์', value: 1 },
  { label: 'มีนาคม', value: 2 },
  { label: 'เมษายน', value: 3 },
  { label: 'พฤษภาคม', value: 4 },
  { label: 'มิถุนายน', value: 5 },
  { label: 'กรกฎาคม', value: 6 },
  { label: 'สิงหาคม', value: 7 },
  { label: 'กันยายน', value: 8 },
  { label: 'ตุลาคม', value: 9 },
  { label: 'พฤศจิกายน', value: 10 },
  { label: 'ธันวาคม', value: 11 },
];

export default function checkboxGroupMonth({ value, onChange }: { value?: string[], onChange?: GetProp<typeof Checkbox.Group, 'onChange'> }) {

  return <CheckboxGroup value={value} onChange={onChange}>
    <Row>
      {options.map(option => <Col span={4}>
        <Checkbox value={option.value}>{option.label}</Checkbox>
      </Col>)}
    </Row>

  </CheckboxGroup>
};