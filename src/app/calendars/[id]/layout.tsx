import Navbar from "./navbar";
import Content from "../../content";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <Navbar />
    <Content>
      {children}
    </Content>
  </>

}
