import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

type ProfileOrderState = {
  orders: TOrder[];
  loading: boolean;
  error: string| null;
}

const initialState: ProfileOrderState = {
  orders: [],
  loading: false,
  error: null
}

export const fetchProfileOrders = createAsyncThunk<TOrder[]>(
  'profileOrders/fetch',
  async () => await getOrdersApi()
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchProfileOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProfileOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(fetchProfileOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Не удалось загрузить историю заказов';
    })
  }
});

export default profileOrdersSlice.reducer;
