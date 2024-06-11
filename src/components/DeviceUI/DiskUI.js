import React from 'react'
import DiskMenuItem from './DiskMenuItem'
import DiskUsageProgressBar from './secondaryComponents/DiskUsageProgressBar/DiskUsageProgressBar'
import { FaLock, FaUnlock } from 'react-icons/fa';
const DiskUI = ({ disk, index, device, setLoaders }) => {
    return (

        <div className="list-group-item mb-2 rounded" style={{ background: "#dde2e7" }}>
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
                                ? <>{' '}{disk.locked ? <FaLock className="text-danger" /> : <FaUnlock className="text-success" />}{' '}</>
                                : ' '
                            }
                        </span>

                    </span>
                </div>
                <div className='col-2 text-start p-0'>
                    {/* {Object.keys(loaders).map(diskId => (
        loaders[diskId] ? <Loader key={diskId} /> : null
    ))} */}
                </div>
                <div className='col-1 text-end p-0'>
                    <DiskMenuItem key={index} deviceId={device.id} diskName={disk.mounted} device={device} diskCrypt={disk.crypt} setLoaders={setLoaders} />

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
    )
}

export default DiskUI
