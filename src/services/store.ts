import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import feedReducer from './slices/feedSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import burgerReducer from './slices/constructorSlice';
import profileOrderReducer from './slices/profileOrderSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import orderDetailsReducer from './slices/orderDetailsSlice';

export const rootReducer = combineReducers({
  feed: feedReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: burgerReducer,
  profileOrders: profileOrderReducer,
  order: orderReducer,
  user: userReducer,
  orderDetails: orderDetailsReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
