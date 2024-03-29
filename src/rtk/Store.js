import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from './DevicesSlice';

const store = configureStore({
    reducer: {
        devices: devicesReducer,
    },
});

export default store;