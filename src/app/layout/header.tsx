import React from "react"
import { Header } from 'antd/es/layout/layout';

import InputSearchNameMember from "@/app/components/inputSearchName"

const MyHeader: React.FC = () => {

    return <>
        <Header style={{ padding: "0 0 0 0" }}>
            <div className="max-h-20 w-full bg-white flex flex-row">
                <div className='h-full justify-self-center'>
                    <img className='h-16' src="/logo.png" alt="logo schedule table" />
                </div>
                <div>
                    <InputSearchNameMember members={[]} />
                </div>
            </div>
        </Header>
    </>
}

export default MyHeader;

