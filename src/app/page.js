"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import "bootstrap/dist/css/bootstrap.min.css";
import SocketConection from "@/components/SocketConection";
import AppLoader from "./../components/Loader/AppLoader";
import TurnOffAll from "@/components/TurnOffAll/TurnOffAll";
import Head from "next/head";
import UpdateButton from "@/components/UpdateButton/UpdateButton";
import UnlockAllDisks from "@/components/UnlockAllDisks/UnlockAllDisks";

const DeviceUi = dynamic(() => import("@/components/DeviceUI/DeviceUI"));
const Auth = dynamic(() => import("@/components/Login/Auth"));

const Home = () => {
  const devices = useSelector((state) => state.devices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(devices.length === 0);
  }, [devices]);

  return (
    <>
      <Head>
        <title>Monitoring</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="container mx-auto py-4"
        style={{ maxWidth: "576px", minWidth: "320px" }}
      >
        <SocketConection />
        <div className="list-group">
          {loading ? (
            <AppLoader show={loading} />
          ) : (
            <>
              <TurnOffAll />
              <UnlockAllDisks devices={devices} />
              <DeviceUi devices={devices} />
            </>
          )}
          <UpdateButton />
          <Auth />
        </div>
      </main>
    </>
  );
};

export default React.memo(Home);
