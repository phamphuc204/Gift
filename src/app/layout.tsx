import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap',
});

const fontSerif = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['600', '700', '800'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EleGift - Quà Tết Cao Cấp Đinh Mùi 2027',
  description:
    'Nền tảng quà Tết doanh nghiệp & hộp quà sơn mài cao cấp Đinh Mùi 2027 với thiết kế riêng, đóng gói hoàng gia, chiết khấu B2B đến 25% và hóa đơn VAT minh bạch.',
  referrer: 'no-referrer',
  openGraph: {
    title: 'EleGift - Quà Tết Cao Cấp Đinh Mùi 2027',
    description:
      'Nền tảng quà Tết doanh nghiệp & hộp quà sơn mài cao cấp Đinh Mùi 2027 với thiết kế riêng, đóng gói hoàng gia, chiết khấu B2B đến 25% và hóa đơn VAT minh bạch.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${fontSans.variable} ${fontSerif.variable}`}>
      <body className="bg-[#4a080c] font-sans text-gray-100 antialiased overflow-x-hidden selection:bg-amber-400 selection:text-red-950">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}