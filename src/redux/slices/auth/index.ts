
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
    loginUser:(state,action)=>{
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
  },
});

export const { logout,loginUser  } = authSlice.actions;
export default authSlice.reducer;