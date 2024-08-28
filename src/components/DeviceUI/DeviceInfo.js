import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addOrUpdateDevice } from '@/rtk/DevicesSlice';

import Online from './Online';
import NicknameInput from '../DiskActions/NicknameInput';
import { sendNickToServer } from '../SocketConection';

import { GoDotFill } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { AiOutlineMenu } from "react-icons/ai";
import { FaLock, FaUnlock } from 'react-icons/fa';

import styles from './deviceInfo.module.css';

const DeviceInfo = ({ device, setModalShow, onClick, renameDeviceId, setRenameDeviceId }) => {
    const [edit, setEdit] = useState(false);
    const [nick, setNick] = useState('');
    const [onlineVisible, setOnlineVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('DeviceInfo useEffect work');
        if (renameDeviceId === device.id) {
            handleEdit();
        }
    }, [renameDeviceId, device.id]);

    const isAnyDiskLocked = (disks) => {
        return disks.some(disk => disk.locked === true);
    };

    const toggleMenu = (e) => {
        e.stopPropagation();
        if (device.online) {
            setModalShow(true)
        } else {
            setModalShow(true)
        }
    };

    const handleEdit = () => {
        console.log('handleEdit start');
        setEdit(true)
        setNick(device.nickname)
    }

    const handleEditEnd = ({ nickName, deviceId }) => {
        console.log('handleEditEnd ');
        setEdit(false)
        console.log(nick)
        console.log(device)
        sendNickToServer({ nickName: nick, deviceId: device.id });

        const updatedDevice = {
            ...device,
            nickname: nick
        };
        console.log(updatedDevice);

        dispatch(addOrUpdateDevice(updatedDevice));
        setRenameDeviceId(null)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleEditEnd(nick);
        }
    }

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        setOnlineVisible(prev => !prev);
    };

    return (
        <>
            <div onClick={handleClick} className={`row align-items-center ${styles.firstRowContainer}`}>
                <div className={`align-self-center m-0 pe-0 ${styles.infoContainer}`}>
                    <h4 className="h4 mb-0 alignt-items-center">
                        {"  "}
                        {device.online ? (
                            <>
                                {edit ? (
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span><GoDotFill style={{ color: 'green', margin: '0 0 3px 0' }} /></span>
                                            <span style={{ fontWeight: "400" }}>{device.name} </span>
                                            <NicknameInput
                                                type="text"
                                                value={nick}
                                                onChange={(e) => setNick(e.target.value)}
                                                onBlur={() => handleEditEnd}
                                                autoFocus
                                                placeholderText=""
                                                handleEditEnd={handleEditEnd}
                                                handleKeyDown={handleKeyDown}
                                            />
                                        </div>

                                    </>
                                ) : (
                                    <>
                                        <div className={styles.container}>
                                            <span><GoDotFill style={{ color: 'green', margin: '0 0 3px 0' }} /></span>
                                            <span className={styles.deviceName}>{device.name}</span>
                                            <span style={{ fontWeight: "600" }}>{device.nickname} </span>
                                            <span style={{ marginRight: 10 }}> </span>
                                            {/* <span style={{ marginRight: 10 }}><CiEdit
                                                onClick={handleEdit}
                                                size={28}
                                                strokeWidth={0.1}
                                                className='edit-icon'
                                            /></span> */}
                                            {isAnyDiskLocked(device.disk)
                                                ? <span style={{ marginLeft: 'auto', marginRight: 10 }}><FaLock className="text-danger" /></span>
                                                : ''
                                            }


                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className={`${styles.container} ${styles.offline}`}>
                                <GoDotFill style={{ margin: '0 0 3px 0' }} />
                                <span className={styles.deviceName}>{device.name}</span>
                                <span>{device.nickname} {' '}</span>
                            </div>

                        )}
                    </h4>
                </div>
                <div className={`text-end align-self-center ps-0 ${styles.burgerContainer}`}>
                    <AiOutlineMenu
                        className="display-4"
                        onClick={toggleMenu}

                    />
                </div>

            </div>
            {onlineVisible && (
                <div className='row align-items-center p-2'>
                    <div className='col-12'>
                        <span className="mb-2 h-6 text-start d-flex">
                            <Online
                                online={device.online}
                                timeLastInfo={device.timeLastInfo}
                                uptime={device.uptime}
                                version={device.version}
                            />

                        </span>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeviceInfo
