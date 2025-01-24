import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AntdRegistry } from '@ant-design/nextjs-registry';

import "./globals.css"

import theme from './theme-config';
import { ConfigProvider, Layout, App } from 'antd';

import Footer from "./components/footer";

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
              <App>
                {children}
              </App>
              <Footer />
            </Layout>
          </body>
        </ConfigProvider>
      </AntdRegistry>
    </html>
  );
}
