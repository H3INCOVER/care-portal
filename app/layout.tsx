import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portal.h3incover.com"),

  title: "オール介護ポータル",

  description:
    "地域の介護事業所を探せる介護事業所ポータルサイト",

  keywords: [
    "介護",
    "介護事業所",
    "訪問介護",
    "デイサービス",
    "福岡",
    "介護ポータル",
  ],

  icons: {
    icon: "/favicon-h3.png",
  },

  openGraph: {
    title: "オール介護ポータル",
    description:
      "地域の介護事業所を探せる介護事業所ポータルサイト",
    url: "https://portal.h3incover.com",
    siteName: "オール介護ポータル",
    locale: "ja_JP",
    type: "website",

    images: [
      {
        url: "/ogp.jpg",
        width: 1200,
        height: 630,
        alt: "オール介護ポータル",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "オール介護ポータル",
    description:
      "地域の介護事業所を探せる介護事業所ポータルサイト",

    images: ["/ogp.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Header />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}