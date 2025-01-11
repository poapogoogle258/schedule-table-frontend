'use client'

import React from 'react';
import Link from 'next/link';

import type { MenuProps } from 'antd';
import { Menu, Layout } from 'antd';

const { Header } = Layout

import '@/app/navbar.css'

type MenuItem = Required<MenuProps>['items'][number];

export default function Navbar() {

    const items : MenuItem[] = [
        { key : "calendar" , label : (<Link href="\calendar\1">ตารางเวร</Link>)},
        { key : "schedule" , label : (<Link href="\calendar\1\schedules">การจัดเวร</Link>)},
        { key : "member" , label : (<Link href="\calendar\1\members">สมาชิก</Link>)},
        { key : "leave" , label : (<Link href="\calendar\1\leaven">รายงานเวร</Link>)},
    ]
    
    return <Header className="menuBar">
        <div className="logo">
            <img src="/logo.png" alt="image" width="60%" />
        </div>
        <div className="menuCon">
            <div className="leftMenu">
                <Menu mode="horizontal" disabledOverflow={true} items={items}>
                </Menu>
            </div>
        </div>
    </Header>
}
