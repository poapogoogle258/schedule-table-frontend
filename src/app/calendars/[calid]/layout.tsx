import Navbar from "../../components/navbar";
import Content from "../../ui/content";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return <>
    <Navbar/>
    <Content>
      {children}
    </Content>
  </>

}
