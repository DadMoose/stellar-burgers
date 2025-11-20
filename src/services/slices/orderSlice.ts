import { TOrder } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';

type OrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
}

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
}

export const createOrder = createAsyncThunk()
