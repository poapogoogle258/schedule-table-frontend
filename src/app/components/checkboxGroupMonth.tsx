'use client'

import React from 'react';
import { Checkbox, Col, Row } from 'antd';
import type { GetProp } from 'antd';

const CheckboxGroup = Checkbox.Group;

const options = [
  { label: 'มกราคม', value: 1 },
  { label: 'กุมภาพันธ์', value: 2 },
  { label: 'มีนาคม', value: 3 },
  { label: 'เมษายน', value: 4 },
  { label: 'พฤษภาคม', value: 5 },
  { label: 'มิถุนายน', value: 6 },
  { label: 'กรกฎาคม', value: 7 },
  { label: 'สิงหาคม', value: 8 },
  { label: 'กันยายน', value: 9 },
  { label: 'ตุลาคม', value: 10 },
  { label: 'พฤศจิกายน', value: 11 },
  { label: 'ธันวาคม', value: 12 },
];

export default function checkboxGroupMonth({ value, onChange }: { value?: string[], onChange?: GetProp<typeof Checkbox.Group, 'onChange'> }) {

  return <CheckboxGroup value={value} onChange={onChange}>
    <Row>
      {options.map(option => <Col key={option.value} span={6}>
        <Checkbox key={option.value} value={option.value}>{option.label}</Checkbox>
      </Col>)}
    </Row>

  </CheckboxGroup>
};