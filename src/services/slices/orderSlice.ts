import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { orderBurgerApi } from '@api';
import { resetConstructor } from './constructorSlice';

type OrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const createOrder = createAsyncThunk<
  TOrder,
  void,
  { state: RootState; rejectValue: string }
>('order/create', async (_, { getState, rejectWithValue, dispatch }) => {
  const { burgerConstructor } = getState();
  if (!burgerConstructor.bun) {
    return rejectWithValue('Сначала добавьте булку');
  }
  const ingredientsIds = [
    burgerConstructor.bun._id,
    ...burgerConstructor.ingredients.map((item) => item._id),
    burgerConstructor.bun._id
  ];

  try {
    const response = await orderBurgerApi(ingredientsIds);
    dispatch(resetConstructor());
    return response.order;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderModalData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Не удалось оформить заказ';
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
