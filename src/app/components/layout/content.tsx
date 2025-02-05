'use client'

import React from "react";
import { Layout } from "antd"

const { Content } = Layout

export default function ContentApp({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return <Content style={{ padding: '0 0 0 0' , minHeight : "100vh"}}>
        {children}
    </Content>
    
}