"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import SocketConection from "@/components/SocketConection";
import 'bootstrap/dist/css/bootstrap.min.css';
import DeviceInputForm from "@/components/inputForm";
import { FaLock, FaUnlock } from 'react-icons/fa';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { GiBattery100, GiBattery50 } from "react-icons/gi";
import DeviceUi from "@/components/DeviceUI/DeviceUI";
import AppLoader from './../components/Loader/AppLoader'

export default function Home() {
  
  const devices = useSelector(state => state.devices)
  const [inputText, setInputText] = useState('');

  

  return (
    <main className="container mx-auto py-4" style={{ maxWidth: '576px', minWidth: '320px' }}>
      <SocketConection />
      <AppLoader show={devices.length === 0} />
      <div className="list-group">
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
      </div>
    </main>

  );
}
