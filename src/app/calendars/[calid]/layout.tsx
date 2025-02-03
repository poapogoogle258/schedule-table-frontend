import Navbar from "../../components/navbar";
import Content from "../../components/content";

import CalendarSelectContext from "./select-date-provider"
import SearchNameProvider from "./search-name-provider"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return <>
    <Navbar />
    <Content>
      <SearchNameProvider>
        <CalendarSelectContext>{children}</CalendarSelectContext>
      </SearchNameProvider>
    </Content>
  </>

}
