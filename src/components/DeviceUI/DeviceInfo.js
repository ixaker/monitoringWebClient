import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addOrUpdateDevice } from "@/rtk/DevicesSlice";
import Online from "./Online";
import NicknameInput from "../DiskActions/NicknameInput";
import { sendNickToServer } from "../SocketConection";
import { GoDotFill } from "react-icons/go";
import { AiOutlineMenu } from "react-icons/ai";
import { FaLock } from "react-icons/fa";

import styles from "./deviceInfo.module.css";

const DeviceInfo = ({
  device,
  setModalShow,
  onClick,
  renameDeviceId,
  setRenameDeviceId,
}) => {
  const [edit, setEdit] = useState(false);
  const [nick, setNick] = useState("");
  const [onlineVisible, setOnlineVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("DeviceInfo useEffect work");
    if (renameDeviceId === device.id) {
      handleEdit();
    }
  }, [renameDeviceId, device.id]);

  const isAnyDiskLocked = (disks) => {
    return disks.some((disk) => disk.locked === true);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (device.online) {
      setModalShow(true);
    } else {
      setModalShow(true);
    }
  };

  const handleEdit = () => {
    console.log("handleEdit start");
    setEdit(true);
    setNick(device.nickname || "");
  };

  const handleEditEnd = ({ nickName, deviceId }) => {
    if (!nickName?.trim()) {
      setNick(device.nickname || ""); // Возвращаем старое значение, если новое пустое
      setEdit(false);
      return;
    }

    const updatedDevice = {
      ...device,
      nickname: nickName.trim(),
    };

    // Отправка на сервер (если устройство онлайн)
    if (device.online) {
      sendNickToServer({
        nickName: nickName.trim(),
        deviceId: deviceId || device.id,
      });
    }

    dispatch(addOrUpdateDevice(updatedDevice));
    setEdit(false);
    setRenameDeviceId(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEditEnd({ nickName: nick, deviceId: device.id });
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setOnlineVisible((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`row align-items-center ${styles.firstRowContainer}`}
      >
        <div className={`align-self-center m-0 pe-0 ${styles.infoContainer}`}>
          <h4 className="h4 mb-0 alignt-items-center">
            {"  "}
            {device.online ? (
              <>
                {edit ? (
                  <>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span>
                        <GoDotFill
                          style={{ color: "green", margin: "0 0 3px 0" }}
                        />
                      </span>
                      <span style={{ fontWeight: "400" }}>{device.name} </span>
                      <NicknameInput
                        type="text"
                        value={nick}
                        autoFocus
                        placeholderText=""
                        onChange={(e) => setNick(e.target.value)}
                        onBlur={() =>
                          handleEditEnd({ nickName: nick, deviceId: device.id })
                        }
                        handleEditEnd={() =>
                          handleEditEnd({ nickName: nick, deviceId: device.id })
                        }
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.container}>
                      <GoDotFill
                        style={{
                          color: "green",
                          margin: "0 4px 3px 0", // Добавлен правый отступ 4px вместо пустого span
                        }}
                      />
                      <span className={styles.deviceName}>{device.name}</span>
                      {device.nickname && (
                        <span className={styles.nickname}>
                          {device.nickname}
                        </span>
                      )}

                      {isAnyDiskLocked(device.disk) && (
                        <FaLock className={`text-danger ${styles.lockIcon}`} />
                      )}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className={`${styles.container} ${styles.offline}`}>
                <GoDotFill style={{ margin: "0 0 3px 0" }} />
                <span className={styles.deviceName}>{device.name}</span>
                <span>{device.nickname} </span>
              </div>
            )}
          </h4>
        </div>
        <div
          className={`text-end align-self-center ps-0 ${styles.burgerContainer}`}
        >
          <AiOutlineMenu className="display-4" onClick={toggleMenu} />
        </div>
      </div>
      {onlineVisible && (
        <div className="row align-items-center p-2">
          <div className="col-12">
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
  );
};

export default DeviceInfo;
