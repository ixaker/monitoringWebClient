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
      localStorage.setItem('token', action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');

      console.log('Redux token cleared');
      // Удаляем токен из localStorage, если он существует
      // Это нужно для того, чтобы синхронизировать состояние Redux с localStorage
      // и избежать ситуации, когда токен остается в localStorage после выхода пользователя
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        console.log('LocalStorage token removed'); // Логируем удаление из localStorage
      }
    },
  },
});

export const selectToken = (state) => state.token.token;

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
