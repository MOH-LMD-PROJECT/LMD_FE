
interface AuthState {
    loading: boolean;
    user: object | null;
    error: Error | null;
  }
  
  
  
  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

  const initialState: AuthState = {
    loading: false,
    //@ts-ignore
    user:   JSON.parse(window.localStorage.getItem('userData')) || {},
    error: null,
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state:AuthState["user"]) => {
      },
    },
    extraReducers: (builder) => {
    },
  });
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;