import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';

import theme from './theme-config';
import { ConfigProvider , Layout } from 'antd';

import Footer from "./footer";

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
            <Layout>
              {children}
              <Footer/>
            </Layout>
          </body>
        </ConfigProvider>
      </AntdRegistry>
    </html>
  );
}
