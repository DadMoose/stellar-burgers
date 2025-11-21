import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';

type OrderDetailsState = {
  data: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: OrderDetailsState = {
  data: null,
  loading: false,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('orderDetails/fetch', async (number, { rejectWithValue }) => {
  try {
    const response = await getOrderByNumberApi(number);
    const order = response.orders[0];
    if (!order) {
      throw new Error('Заказ не найден');
    }
    return order;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    setOrderDetails: (state, action: PayloadAction<TOrder | null>) => {
      state.data = action.payload;
      state.error = null;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || 'Не удалось получить заказ';
      })
});

export const { setOrderDetails } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
