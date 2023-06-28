
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";



interface AuthState {
  user: object | null;
}



const initialState: AuthState = {
  user: {}
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: AuthState["user"]) => {
    },
    login:(state:AuthState['user'])=>{
    
    }
  },
  extraReducers: (builder) => {
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;