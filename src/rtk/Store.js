import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from './DevicesSlice';
import tokenReducer from './TokenSlice';

const store = configureStore({
    reducer: {
        devices: devicesReducer,
        token: tokenReducer,
    },
});

export default store;