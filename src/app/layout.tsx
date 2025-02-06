import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css"

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, App } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import theme from './theme-config';

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
            <App>
                {children}
            </App>
          </body>
        </ConfigProvider>
      </AntdRegistry>
    </html>
  );
}
