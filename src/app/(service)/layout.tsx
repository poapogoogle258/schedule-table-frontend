import { Layout } from "antd"

import MyFooter from "@/app/components/layout/footer"
import MyHeader from "@/app/components/layout/header"
import MySider from "@/app/components/layout/sider";
import MyContent from "@/app/components/layout/content";

import { CollapsedStoreProvider } from "@/app/state/provider/switch-menu-provider";

import { SessionProvider } from "next-auth/react";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return <>
        <Layout>
            <CollapsedStoreProvider>
                <SessionProvider>

                    <MyHeader />
                    <Layout>
                        <MySider />
                        <MyContent>
                            {children}
                        </MyContent>
                    </Layout>
                    <MyFooter />
                </SessionProvider>
            </CollapsedStoreProvider>
        </Layout>
    </>

}
