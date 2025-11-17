import { TOrdersData } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

type FeedState = {
  orders: TOrdersData['orders'];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null,
}

export const fetchFeed = createAsyncThunk<TOrdersData>(
  'fetch/feed',
  async () => await getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchFeed.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchFeed.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    })
    .addCase(fetchFeed.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Не удалось загрузить ленту заказов';
    })
  }
});

export default feedSlice.reducer;
