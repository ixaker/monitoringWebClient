"use client"

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import SocketConection from "@/components/SocketConection";
import 'bootstrap/dist/css/bootstrap.min.css';
// import DeviceUi from "@/components/DeviceUI/DeviceUI";
import AppLoader from './../components/Loader/AppLoader';
import TurnOffAll from "@/components/TurnOffAll/TurnOffAll";
import { sendTelegram } from "@/components/SocketConection";
import Head from 'next/head';
import Login from './../components/Login/Login'
// import Auth from './../components/Login/Auth'

const DeviceUi = dynamic(() => import('@/components/DeviceUI/DeviceUI'));
const Auth = dynamic(() => import('@/components/Login/Auth'));

export default function Home() {

  const devices = useSelector(state => state.devices)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect setLoading', devices.length === 0)
    setLoading(devices.length === 0);
  }, [devices]);

  return (
    <>
      <Head>
        <title>Monitoring</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto py-4" style={{ maxWidth: '576px', minWidth: '320px' }}>
        {/* <Login /> */}
        <SocketConection />
        {loading ? (
          <AppLoader show={loading} />
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
