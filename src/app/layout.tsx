import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';

import theme from './theme/config';
import { ConfigProvider } from 'antd';

import Footer from "./footer";
import Navbar from "./navbar";
import Content from "./content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Schedule Table",
  description: "employee shift system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AntdRegistry>
        <ConfigProvider theme={theme}>
          <body className={`${geistSans.variable} ${geistMono.variable}`}>
              <Navbar/>
              <Content>
                {children}
              </Content>
              <Footer/>
          </body>
        </ConfigProvider>
      </AntdRegistry>
    </html>
  );
}
