import { CalendarPageProvider } from "@/state/provider/calendar-page-provider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CalendarPageProvider>
      {children}
    </CalendarPageProvider>
  )



}
