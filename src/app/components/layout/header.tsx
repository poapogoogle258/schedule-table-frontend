'use client'

import React, { useMemo } from "react"
import { Button } from "antd"
import { MenuOutlined } from "@ant-design/icons"
import { Header } from 'antd/es/layout/layout';

import UserCircleIcon from "@/app/components/icon/user_circleIcon"

import { useCollapseStore } from "@/app/state/provider/switch-menu-provider";
import { signOut, useSession } from "next-auth/react";

const MyHeader: React.FC = () => {
    const { data : session } = useSession()
    const { switchCollapsed } = useCollapseStore((state) => state)

    return <>
        <Header style={{ padding: "0 0 0 0" }}>
            <div className="h-full w-full flex flex-row justify-between items-center">
                <div className="w-[200px] flex flex-row gap-1">
                    <div className="w-[80px] grid place-content-center">
                        <Button size='large' type='text' icon={<MenuOutlined />} onClick={() => { void switchCollapsed() }} />
                    </div>
                    <img className='max-w-[120px] max-h-[50px] aspect-auto' src="/logo.png" alt="logo schedule table" />
                </div>
                <div className="h-full w-25 px-4 grid grid-flow-col grid-rows-2 grid-cols-2 justify-end place-items-center">
                    <div className="row-span-2 flex justify-center">
                        <Button disabled={true} size='large' type='text' onClick={() => { }}>
                            <UserCircleIcon />
                        </Button>
                    </div>
                    <div>
                        {session?.user.name}
                    </div>
                    <div>
                        <a className="text-red-400 text-ellipsis text-sm  underline hover:text-red-600" onClick={() => {signOut()}}>
                            ออกจากระบบ
                        </a>
                    </div>
                </div>
            </div>
        </Header >
    </>
}

export default MyHeader;

