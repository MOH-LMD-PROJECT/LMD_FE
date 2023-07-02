import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../../api/apiClient';


export const getCondoms = createAsyncThunk<any,any,any>('/search', async () => {
  try {
    const { data } = await apiClient.get('/condoms');
    return data;

  } catch (error:any) {
    return Promise.reject({ message: error.response.data.message });
  }
});

export const getUnitsOfMeasure = createAsyncThunk<any,any,any>('/unitofmeasures', async () => {
  try {
    const { data } = await apiClient.get('/unitOfMeasures');
    return data;

  } catch (error:any) {
    return Promise.reject({ message: error.response.data.message });
  }
});


export const addCondom = createAsyncThunk<any,any,any>('/addCondom', async (Data) => {
  try {
    console.log(Data)
    const { data } = await apiClient.post('/condoms',Data);
    return data;

  } catch (error:any) {
    return Promise.reject({ message: error.response.data.message });
  }
});


export const getCondom = createAsyncThunk<any,any,any>('/condom/:id', async (id) => {
  try {
    const { data } = await apiClient.get(`/condoms/${id}`);
    return data;

  } catch (error:any) {
    return Promise.reject({ message: error.response.data.message });
  }
});


export const deleteCondom = createAsyncThunk<any,any,any>('/comdom/:id', async (id) => {
  try {
    const { data } = await apiClient.delete(`/condoms/${id}`);
    return data;

  } catch (error:any) {
    return Promise.reject({ message: error.response.data.message });
  }
});


interface CondomState {
  loading: boolean;
  condom: object | null;
  units: object | null;
  error: Error | null;
}




const initialState: CondomState = {
  loading: false,
  condom:  {},
  error: null,
  units:{}
};

const condomSlice = createSlice({
  name: 'condom',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getCondoms.pending, (state) => {
      state.loading = true;
      state.error = null;

    });
    builder.addCase(getCondoms.fulfilled, (state, action) => {
      state.loading = false;
      state.condom = action.payload;
      state.error = null
    });
    builder.addCase(getCondoms.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error as Error;
    });


    builder.addCase(getUnitsOfMeasure.pending, (state) => {
      state.loading = true;
      state.error = null;

    });
    builder.addCase(getUnitsOfMeasure.fulfilled, (state, action) => {
      state.loading = false;
      state.units = action.payload;
      state.error = null
    });
    builder.addCase(getUnitsOfMeasure.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error as Error;
    });

  },
});

// export const { setSearchTerm} = productSlice.actions;


export default condomSlice.reducer;