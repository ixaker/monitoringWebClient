'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import store from './../rtk/Store';
import ReduxProvider from "./../rtk/ReduxProvider"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider store={store}>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
