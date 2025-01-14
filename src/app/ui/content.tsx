'use client'

import React from "react";
import { Layout } from "antd"

const { Content } = Layout

export default function ContentApp({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return <Content style={{ padding: '10px 48px' , height : "100vh"}}>
        {children}
    </Content>
    
}