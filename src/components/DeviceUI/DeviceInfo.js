import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addOrUpdateDevice } from '@/rtk/DevicesSlice';

import Online from './Online';
import NicknameInput from '../DiskActions/NicknameInput';
import { sendNickToServer } from '../SocketConection';

import { GoDotFill } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { AiOutlineMenu } from "react-icons/ai";

const DeviceInfo = ({ device, setModalShow }) => {

    const [edit, setEdit] = useState(false)
    const [nick, setNick] = useState('')
    const dispatch = useDispatch();

    const toggleMenu = () => {
        if (device.online) {
            setModalShow(true)
        }
    };

    const handleEdit = () => {
        setEdit(true)
        setNick(device.nickname)
    }

    const handleEditEnd = ({ nickName, deviceId }) => {
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
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleEditEnd(nick);
        }
    }

    return (
        <>
            <div className='row align-items-center'>
                <div className='col-10 align-self-center m-0 pe-0'>
                    <h4 className="h4 mb-0 alignt-items-center">
                        {"  "}
                        {device.online ? (
                            <>
                                {edit ? (
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span><GoDotFill style={{ color: 'green', margin: '0 0 3px 0' }} /></span>
                                            <span style={{ fontWeight: "400" }}>{device.name}. </span>
                                            <NicknameInput
                                                type="text"
                                                value={nick}
                                                onChange={(e) => setNick(e.target.value)}
                                                onBlur={handleEditEnd}
                                                autoFocus
                                                placeholderText=""
                                                handleEditEnd={handleEditEnd}
                                                hadleKeyDown={handleKeyDown}
                                            />
                                        </div>

                                    </>
                                ) : (
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span><GoDotFill style={{ color: 'green', margin: '0 0 3px 0' }} /></span>
                                            <span style={{ fontWeight: "400" }}>{device.name}. </span>
                                            <span style={{ marginRight: 10 }}> </span>
                                            <span style={{ fontWeight: "600" }}> {device.nickname} </span>
                                            <span style={{ marginRight: 10 }}> </span>
                                            <span><CiEdit
                                                onClick={handleEdit}
                                                size={28}
                                                strokeWidth={0.1}
                                                className='edit-icon'
                                            /></span>

                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <GoDotFill style={{ color: 'grey', margin: '0 0 3px 0' }} />
                                <span style={{ color: 'grey' }}>{device.name}. {device.nickname} {' '}</span>
                            </>

                        )}
                    </h4>
                </div>
                <div className='col-2 text-end align-self-start ps-0'>
                    <AiOutlineMenu
                        className="display-4"
                        onClick={toggleMenu}
                    />
                </div>
            </div>
            <div className='row align-items-center p-2'>
                <div className='col-12'>
                    <span className="mb-2 h-6 text-start">
                        <Online
                            online={device.online}
                            timeLastInfo={device.timeLastInfo}
                            uptime={device.uptime}
                        />
                    </span>
                </div>
            </div>
        </>
    )
}

export default DeviceInfo
