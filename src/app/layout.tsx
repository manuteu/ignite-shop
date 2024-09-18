import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Roboto } from 'next/font/google'
import { getCssText } from "@/styles";

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Ignite Shop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </head>
      <body
        className={roboto.className}
      >
        {children}
      </body>
    </html>
  );
}
