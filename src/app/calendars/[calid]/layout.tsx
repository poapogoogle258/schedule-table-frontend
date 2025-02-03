import Content from "../../layout/content";

import CalendarSelectContext from "./select-date-provider"
import SearchNameProvider from "./search-name-provider"

import MyNavbar from "@/app/components/navbar";
import MyFooter from "@/app/layout/footer"
import MyHeader from "@/app/layout/header"

import { Layout } from "antd"
import MySider from "@/app/layout/sider";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return <>
    <Layout hasSider={true}>
      <MySider/>
      <Layout hasSider={false}>
      <SearchNameProvider>
        <MyHeader/>
        <Content>
            <CalendarSelectContext>{children}</CalendarSelectContext>
        </Content>
        </SearchNameProvider>
        <MyFooter />
      </Layout>
    </Layout>
  </>

}
