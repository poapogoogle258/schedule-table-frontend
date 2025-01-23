'use client'

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation'

import type { MenuProps } from 'antd';
import { Menu, Layout } from 'antd';

const { Header } = Layout

import './navbar.css'

type MenuItem = Required<MenuProps>['items'][number];

export default function Navbar() {

    const {calid} = useParams<{ calid: string }>()

    const items: MenuItem[] = [
        {
            key: "calendar", 
            label: (
                <Link href={`\\calendars\\${calid}`}>ตารางเวร</Link>
            )
        },
        {
            key: "schedule", 
            label: (
                <Link href={`\\calendars\\${calid}\\schedules`}>การจัดเวร</Link>
            )
        },
        {
            key: "member", 
            label: (
                <Link href={`\\calendars\\${calid}\\members`}>สมาชิก</Link>
            )
        },
        {
            key: "leave", 
            label: (
                <Link href={`\\calendars\\${calid}\\leave`}>รายงานเวร</Link>
            )
        },
    ]

    return <>
        <Header className="menuBar">
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
    </>

}
