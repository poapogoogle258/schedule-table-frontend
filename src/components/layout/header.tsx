'use client'

import React from "react"
import { Button } from "antd"
import { MenuOutlined } from "@ant-design/icons"
import { Header } from 'antd/es/layout/layout';

import UserCircleIcon from "@/components/icon/user_circleIcon"

import { useCollapseStore } from "@/state/provider/switch-menu-provider";


const MyHeader: React.FC = () => {

    const { switchCollapsed } = useCollapseStore((state) => state)

    return <>
        <Header style={{ padding: "0 0 0 0" }}>
            <div className="h-full w-full flex flex-row justify-start items-center">
                <div className="w-[200px] flex flex-row gap-1">
                    <div className="w-[80px] grid place-content-center">
                        <Button size='large' type='text' icon={<MenuOutlined />} onClick={() => { void switchCollapsed() }} />
                    </div>
                    <img className='max-w-[120px] max-h-[50px] aspect-auto' src="/logo.png" alt="logo schedule table" />
                </div>
                <div className="h-full w-full flex flex-row items-center justify-end">
                    <Button disabled={true} size='large' type='text' onClick={() => { }}>
                        <UserCircleIcon />
                    </Button>
                </div>
            </div>
        </Header >
    </>
}

export default MyHeader;

