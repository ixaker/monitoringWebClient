import { createSlice } from '@reduxjs/toolkit';

const initialDevices = [
    
];

const saveStateToLocalStorage = (state) => {
    localStorage.setItem('devices', JSON.stringify(state));
  };

const devicesSlice = createSlice({
        name: 'devices',
        initialState: initialDevices,
        reducers: {
            addOrUpdateDevice(state, action) {
                const newDevice = action.payload;
                const existingDeviceIndex = state.findIndex(device => device.id === newDevice.id);
                
                let updatedState
                if (existingDeviceIndex !== -1) {
                    console.log('Update device in store');
                    console.log(newDevice.id);
                    return state.map((device, index) =>
                    index === existingDeviceIndex ? newDevice : device
                );
                  
                } else {
                    console.log('Add device in store');
                    return [...state, newDevice];
                }

                saveStateToLocalStorage(updatedState);

                return updatedState;
            },
        },
    });

export const { addOrUpdateDevice } = devicesSlice.actions;
export default devicesSlice.reducer;