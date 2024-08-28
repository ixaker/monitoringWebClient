'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import store from './../rtk/Store';
import ReduxProvider from "./../rtk/ReduxProvider"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4285F4" />
        <title>Monitoring QPart</title>
        <meta name="description" content="App for monitoring devices" />
      </head>
      <body className={inter.className}>
        <ReduxProvider store={store}>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
