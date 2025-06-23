import React from "react";
import DiskMenuItem from "./DiskMenuItem";
import DiskUsageProgressBar from "./secondaryComponents/DiskUsageProgressBar/DiskUsageProgressBar";
import { FaLock, FaUnlock } from "react-icons/fa";

const DiskUI = ({ disk, index, device, setLoaders }) => {
  return (
    <div
      className="list-group-item mb-2 rounded"
      style={{ background: "#dde2e7" }}
    >
      <div className="row mb-2 align-items-center p-2">
        <div className="col-3 p-0">
          <span className="h4">Диск {disk.mounted}</span>
        </div>
        <div className="col-6 text-start p-0">
          <span className={disk.crypt ? "text-dark" : "text-success"}>
            {disk.crypt ? "зашифровано" : "не зашифровано"}
            {disk.crypt &&
              (disk.locked ? (
                <FaLock className="text-danger ms-1" />
              ) : (
                <FaUnlock className="text-success ms-1" />
              ))}
          </span>
        </div>
        <div className="col-auto p-0 ms-auto me-0">
          <DiskMenuItem
            key={index}
            deviceId={device.id}
            diskName={disk.mounted}
            device={device}
            diskCrypt={disk.crypt}
            setLoaders={setLoaders}
          />
        </div>
      </div>
      <div className="row">
        <div className="mb-2 p-2">
          <DiskUsageProgressBar
            usedSpace={disk.used}
            availableSpace={disk.available}
            totalSpace={disk.total}
          />
        </div>
      </div>
    </div>
  );
};

export default DiskUI;
