import { createSlice } from '@reduxjs/toolkit';

const initialToken = {
    token: null,
};

const tokenSlice = createSlice({
    name: 'token',
    initialState: initialToken,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            const token = action.payload;
            console.log('token slice action=', action, token);
        },
    },
});



export const selectToken = (state) => state.token.token;

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;