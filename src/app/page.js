"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useSelector } from 'react-redux';
import SocketConection from "@/components/SocketConection";
import 'bootstrap/dist/css/bootstrap.min.css';
import DeviceUi from "@/components/DeviceUI/DeviceUI";
import AppLoader from './../components/Loader/AppLoader'
import TurnOffAll from "@/components/TurnOffAll/TurnOffAll";
import { sendTelegram } from "@/components/SocketConection";
import Head from 'next/head'; 
import Login from './../components/Login/Login'
import Auth from './../components/Login/Auth'

export default function Home() {
  
  const devices = useSelector(state => state.devices)
  
  return (
    <>
      <Head>
        <title>Monitoring</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>  
      <main className="container mx-auto py-4" style={{ maxWidth: '576px', minWidth: '320px' }}>
        <Login />
        <SocketConection/>
        {devices.length === 0 ? (
          <AppLoader show={devices.length === 0}/>
        ) : (
          <div className="list-group">
            <TurnOffAll />
            {/* <MyButton buttonText={'Відправити повідомлення в телеграм'} handleOnClick={sendTelegram}/> */}
            {devices.map(device => (
              <DeviceUi
                key={device.id}
                deviceName={device.name}
                ip={device.ip}
                discs={device.disk}
                deviceId={device.id}
                device={device}
              />
            ))}
            <Auth />
          </div>
        )}
      </main>
    </>
  );
}
