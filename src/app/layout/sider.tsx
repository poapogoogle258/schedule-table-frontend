'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import type { MenuProps } from 'antd';
import { Menu, Button, Layout } from 'antd';
import { MenuOutlined } from "@ant-design/icons"

import CalendarIcon from "@/icon/calendar"
import UserGroupIcon from "@/icon/userGroup"
import AppointmentIcon from "@/icon/appointment"
import LeavingIcon from "@/icon/Leaving"



const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number];

const MySider: React.FC = () => {
    const { calid } = useParams<{ calid: string }>()
    const pathname = usePathname()
    const currentDefault = useMemo(() => {
        const uuid = "[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}"
        const select_scheduleNav = new RegExp(`/calendars/${uuid}/schedules+`, "ig")
        const select_memberNav = new RegExp(`/calendars/${uuid}/members+`, "ig")
        const select_leavesNav = new RegExp(`/calendars/${uuid}/leaves+`, "ig")
        const select_calendarNav = new RegExp(`/calendars/${uuid}`)

        if (select_scheduleNav.test(pathname)) {
            return "schedule"
        } else if (select_memberNav.test(pathname)) {
            return "member"
        } else if (select_leavesNav.test(pathname)) {
            return "leave"
        } else if (select_calendarNav.test(pathname)) {
            return "calendar"
        } else {
            return ""
        }

    }, [])
    const [current, setCurrent] = useState(currentDefault);
    const [collapsed, setCollapsed] = useState<boolean>(false)

    useEffect(() => {
        console.log("collapsed", collapsed)
    }, [collapsed])

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    const items: MenuItem[] = [
        {
            key: "calendar",
            icon: <CalendarIcon />,
            label: (
                <div className='w-[5vw] grid justify-items-center'>
                    <Link href={`\\calendars\\${calid}`}>ตารางเวร</Link>
                </div>
            )
        },
        {
            key: "schedule",
            icon: <AppointmentIcon />,
            label: (
                <div className='w-[5vw] grid justify-items-center'>
                    <Link href={`\\calendars\\${calid}\\schedules`}>การจัดเวร</Link>
                </div>
            )
        },
        {
            key: "member",
            icon: <UserGroupIcon />,

            label: (
                <div className='w-[5vw] grid justify-items-center'>
                    <Link href={`\\calendars\\${calid}\\members`}>สมาชิก</Link>
                </div>
            )
        },
        {
            key: "leave",
            icon: <LeavingIcon />,

            disabled: true,
            label: (
                <div className='w-[5vw] grid justify-items-center'>
                    <h3>วันหยุดวันลา</h3>
                    {/* <Link href={`\\calendars\\${calid}\\leaves`}>วันหยุดวันลา</Link> */}
                </div>
            )
        },
    ];

    return (
        <div>
            <div className='min-h-16 max-w-[80px] flex justify-center items-center'>
                <Button type='text' icon={<MenuOutlined />} onClick={() => { setCollapsed(!collapsed) }} />
            </div>
            <div className='min-h-screen max-h-full bg-white'>
                <Sider trigger={null} theme='light' collapsible collapsed={collapsed} >
                    <div className='w-full py-5'>
                        <div className="pt-10">
                            <Menu
                                style={{ border: "none" }}
                                onClick={onClick}
                                mode="inline"
                                selectedKeys={[current]}
                                items={items}
                            />
                        </div>
                    </div>
                </Sider>
            </div>
        </div>

    );
};

export default MySider;

