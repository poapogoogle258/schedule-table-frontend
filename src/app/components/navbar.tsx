'use client'

import React, { useMemo, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];



const MyNavbar: React.FC = () => {
    const { calid } = useParams<{ calid: string }>()
    const pathname = usePathname()
    const currentDefault = useMemo(() => {
        const uuid = "[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}"
        const select_scheduleNav = new RegExp(`/calendars/${uuid}/schedules+`, "ig")
        const select_memberNav = new RegExp(`/calendars/${uuid}/members+`, "ig")
        const select_leavesNav = new RegExp(`/calendars/${uuid}/leaves+`, "ig")

        if (select_scheduleNav.test(pathname)) {
            return "schedule"
        } else if (select_memberNav.test(pathname)) {
            return "member"
        } else if (select_leavesNav.test(pathname)) {
            return "leave"
        } else {
            return ""
        }

    }, [])
    const [current, setCurrent] = useState(currentDefault);

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    const items: MenuItem[] = [
        {
            key: "calendar",
            label: (
                <div className='w-[100px] grid justify-items-center'>
                    <Link href={`\\calendars\\${calid}`}>ตารางเวร</Link>
                </div>
            )
        },
        {
            key: "schedule",
            label: (
                <div className='w-[100px] grid justify-items-center'>
                    <Link href={`\\calendars\\${calid}\\schedules`}>การจัดเวร</Link>
                </div>
            )
        },
        {
            key: "member",
            label: (
                <div className='w-[100px] grid justify-items-center'>
                    <Link href={`\\calendars\\${calid}\\members`}>สมาชิก</Link>
                </div>
            )
        },
        {
            key: "leave",
            disabled: true,
            label: (
                <div className='w-[100px] grid justify-items-center'>
                    <h3>วันหยุดวันลา</h3>
                    {/* <Link href={`\\calendars\\${calid}\\leaves`}>วันหยุดวันลา</Link> */}
                </div>
            )
        },
    ];

    return (
        <div className='max-h-20 px-8 py-1 bg-white grid grid-cols-12'>
            <div className='h-full col-span-1 justify-self-center'>
                <img className='h-16' src="/logo.png" alt="logo schedule table" />
            </div>
            <div className='container col-span-4'>
                <Menu className='h-full flex items-center justify-start gap-1' style={{ borderBottom: "none" }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </div>
        </div>
    );
};

export default MyNavbar;