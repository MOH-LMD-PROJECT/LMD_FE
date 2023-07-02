// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const updateUser = createAsyncThunk(
//   'user/update',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.put('https://example.com/api/user', userData); // Replace with your endpoint
//       return response.data;
//     } catch (error:any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// // const initialState:any

// const userSlice:any = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     // ...other reducers
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(updateUser.fulfilled, (state, action) => {
//         // Update the user state with the response data
//         state.username = action.payload.username;
//         state.firstname = action.payload.firstname;
//         state.lastname = action.payload.lastname;
//         state.password = action.payload.password;
//         state.email = action.payload.email;
//         state.role = action.payload.role;
//         state.organization_unit_id = action.payload.organization_unit_id;
//         state.location = action.payload.location;
//         state.phone_number = action.payload.phone_number;
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         // Handle the rejection/error here
//         console.log('Update user failed:', action.payload);
//       });
//   },
// });

// export const { logout, loginUser } = userSlice.actions;
// export default userSlice.reducer;
