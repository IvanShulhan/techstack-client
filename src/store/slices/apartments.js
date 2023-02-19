import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
  apartments: [],
  status: 'idle',
};

export const fetchApartments = createAsyncThunk(
  'apartments/fetchApartments',
  async (searchParams) => {
    const { data } = await axios.get(`/apartments/${searchParams}`);
    return data;
  }
);

export const fetchCreateApartment = createAsyncThunk(
  'apartments/fetchCreateApartment',
  async (params) => {
    const { data } = await axios.post('/apartments', params);
    return data;
  }
);

export const fetchRemoveApartment = createAsyncThunk(
  'apartments/fetchRemoveApartment',
  (id) => axios.delete(`/apartments/${id}`)
);

export const apartmentsSlice = createSlice({
  name: 'apartments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApartments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApartments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.apartments = action.payload;
      })
      .addCase(fetchRemoveApartment.fulfilled, (state, action) => {
        state.apartments = state.apartments.filter((apartmemt) => (
          apartmemt._id !== action.meta.arg
        ));
      })
      .addCase(fetchCreateApartment.fulfilled, (state, action) => {
        state.apartments.push(action.payload)
      })
  },
});

export const selectApartments = (state) => state.apartments;
export default apartmentsSlice.reducer;
