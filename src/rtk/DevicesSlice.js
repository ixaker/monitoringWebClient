import { createSlice } from "@reduxjs/toolkit";

const initialDevices = [];

const devicesSlice = createSlice({
  name: "devices",
  initialState: initialDevices,
  reducers: {
    addOrUpdateDevice(state, action) {
      const newDevice = action.payload;
      const existingDeviceIndex = state.findIndex(
        (device) => device.id === newDevice.id
      );

      if (existingDeviceIndex !== -1) {
        state[existingDeviceIndex] = newDevice;
      } else {
        state.push(newDevice);
      }

      state.sort((a, b) => {
        const isALocked = a.disk && a.disk.some((disk) => disk.locked === true);
        const isBLocked = b.disk && b.disk.some((disk) => disk.locked === true);

        if (a.name === "RootServer1") return -1;
        if (b.name === "RootServer1") return 1;
        if (a.name === "RootServer2") return -1;
        if (b.name === "RootServer2") return 1;

        if (isALocked && !isBLocked) return -1;
        if (!isALocked && isBLocked) return 1;

        return a.name.localeCompare(b.name);
      });
    },
    removeDevice(state, action) {
      const deviceId = action.payload;
      return state.filter((device) => device.id !== deviceId);
    },
  },
});

export const { addOrUpdateDevice, removeDevice } = devicesSlice.actions;
export default devicesSlice.reducer;
