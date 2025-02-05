'use client'

import React, { useMemo, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import type { MenuProps } from 'antd';
import { Menu, Layout, Grid } from 'antd';

import CalendarIcon from "@/app/components/icon/calendar"
import UserGroupIcon from "@/app/components/icon/userGroup"
import AppointmentIcon from "@/app/components/icon/appointment"
import LeavingIcon from "@/app/components/icon/Leaving"
import FileIcon from "@/app/components/icon/file"

import { useCollapseStore } from '@/app/state/provider/switch-menu-provider';

const { Sider } = Layout
const { useBreakpoint } = Grid

type MenuItem = Required<MenuProps>['items'][number];

const MySider: React.FC = () => {
    const { calid } = useParams<{ calid: string }>()
    const pathname = usePathname()
    const breakpoint = useBreakpoint()

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
    const collapsedWidth = useMemo(() => {
        if (breakpoint.xs) {
            return 0
        } else {
            return 80 // default width Rider
        }
    }, [breakpoint])

    const [current, setCurrent] = useState(currentDefault);
    const { collapsed } = useCollapseStore((state) => state)


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
        {
            key: "report",
            icon: <FileIcon />,
            disabled: true,
            label: (
                <div className='w-[5vw] grid justify-items-center'>
                    <h3>รายงานเวร</h3>
                    {/* <Link href={`\\calendars\\${calid}\\report`}>รายงานเวร</Link> */}
                </div>
            )
        },
    ];

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={collapsedWidth}>
            <div className='h-screen max-h-full pt-3'>
                <Menu
                    style={{ border: "none", background : "#f5f5f5" }}
                    onClick={onClick}
                    mode="inline"
                    selectedKeys={[current]}
                    items={items}
                />
            </div>
        </Sider>
    );
};

export default MySider;

