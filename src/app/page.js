'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import 'bootstrap/dist/css/bootstrap.min.css';
import SocketConection from '@/components/SocketConection';
import AppLoader from './../components/Loader/AppLoader';
import TurnOffAll from '@/components/TurnOffAll/TurnOffAll';
import Head from 'next/head';
import UpdateButton from '@/components/UpdateButton/UpdateButton';
import UnlockAllDisks from '@/components/UnlockAllDisks/UnlockAllDisks';
import { setToken } from '@/rtk/TokenSlice';
import UpdatePassword from '@/components/UpdatePassword/UpdatePassword';

const DeviceUi = dynamic(() => import('@/components/DeviceUI/DeviceUI'));
const Auth = dynamic(() => import('@/components/Login/Auth'));

const Home = () => {
  const token = useSelector((state) => state.token.token);
  const devices = useSelector((state) => state.devices);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Новое состояние для проверки авторизации

  useEffect(() => {
    // Восстанавливаем токен из localStorage при перезагрузке
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      dispatch(setToken(savedToken)); // Диспатчим действие для установки токена
    }
    setIsCheckingAuth(false);
  }, [dispatch]);

  useEffect(() => {
    setLoading(devices.length === 0);
  }, [devices]);

  // Пока проверяем авторизацию - не показываем ничего (или можно показать лоадер)
  if (isCheckingAuth) {
    return <AppLoader show={true} />;
  }

  return (
    <>
      <Head>
        <title>Monitoring</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="container mx-auto py-4"
        style={{ maxWidth: '576px', minWidth: '320px' }}
      >
        <SocketConection />

        {token ? (
          loading ? (
            <AppLoader show={true} />
          ) : (
            <div className="list-group">
              <TurnOffAll />
              <UnlockAllDisks devices={devices} />
              <DeviceUi devices={devices} />
              <UpdateButton />
              <div className="d-flex justify-between align-items-center gap-2 w-100">
                <div style={{ flex: 4 }}>
                  <Auth />
                </div>
                <div style={{ flex: 6 }}>
                  <UpdatePassword />
                </div>
              </div>
            </div>
          )
        ) : (
          <Auth />
        )}
      </main>
    </>
  );
};

export default React.memo(Home);
