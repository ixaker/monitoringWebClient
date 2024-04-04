import React, {useState, useRef, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { addOrUpdateDevice } from '@/rtk/DevicesSlice';

// components
import DeviceInputForm from '../inputForm';
import DiskUsageProgressBar from './DiskUsageProgressBar';
import CPU from './../CPU/CPU';
import RAM from './../RAM/RAM';
import Online from './Online';
import DeviceMenu from './DeviceMenu';
import DiskMenuItem from './DiskMenuItem';
import NicknameInput from '../DiskActions/NicknameInput';
import { sendNickToServer } from '../SocketConection';

// icons
import { GoDotFill } from "react-icons/go";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaLock, FaUnlock } from 'react-icons/fa';
import { CiEdit } from "react-icons/ci";
import { GiConfirmed } from "react-icons/gi";
// loader
import Loader from '../Loader/Loader';
import './deviceui.css'
// класний колір шрифта #225e99

const DeviceUi = ({
        deviceName,
        ip,
        discs,
        deviceId,
        device,
        
    }) => {

    const [modalShow, setModalShow] = React.useState(false);
    const [loaders, setLoaders] = useState({});
    const [edit, setEdit] = useState(false)
    const [nick, setNick] = useState('')

    const dispatch = useDispatch();

    const handleEdit = () => {
        setEdit(true)
        setNick(device.nickname)
    }

    const handleEditEnd = ({nickName, deviceId}) => {
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

    const toggleMenu = () => {
        
        if (device.online) {
            setModalShow(true)
            console.log(modalShow)
        }
        
    };

    const toggleDiskMenu = () => {
        
        if (device.online) {
            setOpenDiskMenu(!openDiskMenu);
            console.log(modalShow)
        }
        
    };

    return (
        <div className="position-relative container mb-4 border rounded p-3 pb-2 bg-dark-subtle align-items-center shadow" style={{border: "2px solid red"}}>
            <DeviceMenu 
                deviceId={device.id}
                device={device}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            <div className='row align-items-center'>
                <div className='col-10 align-self-center m-0 pe-0'>
                    <h4 className="h4 mb-0 alignt-items-center">
                        {"  "}
                        {device.online ? (
                            <>
                                {edit ? (
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span><GoDotFill style={{color: 'green', margin: '0 0 3px 0'}} /></span>
                                            <span style={{ fontWeight: "400" }}>{deviceName}. </span>
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
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                            <span><GoDotFill style={{color: 'green', margin: '0 0 3px 0'}} /></span>
                                            <span style={{"font-weight": "400"}}>{deviceName}. </span>
                                            <span style={{marginRight: 10}}> </span>
                                            <span style={{"font-weight": "600"}}> {device.nickname} </span>
                                            <span style={{marginRight: 10}}> </span>
                                            <span><CiEdit 
                                                onClick={handleEdit} 
                                                size={28}    
                                                strokeWidth={0.1}
                                            /></span>
                                        
                                        </div>
                                    </>
                                )}
                            </>
                    ) : (
                        <>
                            <GoDotFill style={{color: 'grey', margin: '0 0 3px 0'}}/>
                            <span style={{ color: 'grey' }}>{deviceName}. {device.nickname} {' '}</span>
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
            <p className="mb-1">{ip}</p>
            <div className="list-group">
            
            {discs.map((disk, index) => (
                <div key={index} className="list-group-item mb-2 rounded" style={{background: "#dde2e7"}}>
                    <div className='row mb-2 align-items-center p-2'>
                        <div className='col-3 p-0 '>
                            <span className="h4">Диск {disk.mounted}</span>
                        </div>
                        <div className='col-6 text-start p-0'>
                            <span className=""> 
                                <span className={disk.crypt ? 'text-dark' : 'text-success'}>
                                    {disk.crypt 
                                        ? 'зашифровано '
                                        : 'не зашифровано '
                                    }
                                    <span className='m-1'></span>
                                    {disk.crypt 
                                        ? ""
                                        : ""
                                    }
                                    {disk.crypt 
                                        ? <>{' '}{disk.locked ? <FaLock className="text-danger"/> : <FaUnlock className="text-success"/>}{' '}</>
                                        : ' '
                                    }
                                </span>
                            
                            </span>
                        </div>
                        <div className='col-2 text-start p-0'>
                        {Object.keys(loaders).map(diskId => (
                            loaders[diskId] ? <Loader key={diskId} /> : null
                        ))}
                        </div>
                        <div className='col-1 text-end p-0'>
                        <DiskMenuItem key={index} deviceId={deviceId} diskName={disk.mounted} device={device} diskCrypt={disk.crypt} setLoader={setLoaders}/>

                        </div>
                    </div>
                    <div className='row'>
                        <span className="mb-2 p-2">
                            <DiskUsageProgressBar   
                                usedSpace={disk.used}
                                availableSpace={disk.available}
                                totalSpace={disk.total}
                            />
                        </span>
                    </div>
                </div>
            ))}
            <div className='containter rounded'>
                {/* CPU */}
                {/* {device.CPU.load !== null 
                    ?   <>
                            <div className='row align-items-center mb-2'>
                            <div className='col-2 text-center'>
                                <h3 className="h6">CPU</h3>
                            </div>
                            <div className='col-10'>
                                <div className='containter bg-dark rounded'>
                                    <CPU 
                                        style={{ height: '500px' }}
                                        data={device.CPU.history}
                                    />
                                    </div>
                                </div>
                            </div>
                        </>
                    : ""
                } */}
                {/* RAM */}
                {/* {device.CPU.load !== null 
                    ?   <>
                            <div className='row align-items-center mb-2'>
                            <div className='col-2 text-center'>
                                <h3 className="h6">RAM</h3>
                            </div>
                            <div className='col-10'>
                                <div className='containter bg-dark rounded'>
                                    <CPU 
                                        style={{ height: '500px' }}
                                        data={device.RAM.history}
                                    />
                                    </div>
                                </div>
                            </div>
                        </>
                    : ""
                } */}
            </div>
            {/* <DeviceInputForm 
                deviceId={deviceId}
            /> */}
            
        </div>
      </div>
    );
  };

  export default DeviceUi;