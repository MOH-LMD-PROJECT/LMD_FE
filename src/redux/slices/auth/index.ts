
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";



interface AuthState {
  user: object | null;
}



const initialState: AuthState = {
  //@ts-ignore
  user: JSON.parse(window.localStorage.getItem('userData')) || {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      localStorage.removeItem('userData')
    },
    loginUser:(state,action)=>{
      state.user = action.payload;
      localStorage.setItem('userData', JSON.stringify(action.payload))
    }
  },
  extraReducers: (builder) => {
  },
});

export const { logout,loginUser  } = authSlice.actions;
export default authSlice.reducer;