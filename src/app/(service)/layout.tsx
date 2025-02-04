import { Layout } from "antd"

import MyFooter from "@/components/layout/footer"
import MyHeader from "@/components/layout/header"
import MySider from "@/components/layout/sider";
import MyContent from "@/components/layout/content";


import { CollapsedStoreProvider } from "@/state/provider/switch-menu-provider";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return <>
        <Layout>
            <CollapsedStoreProvider>
                <MyHeader />
                <Layout>
                    <MySider />
                    <MyContent>
                        {children}
                    </MyContent>
                </Layout>
                <MyFooter />
            </CollapsedStoreProvider>
        </Layout>
    </>

}
