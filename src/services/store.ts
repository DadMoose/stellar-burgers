import {
  combineReducers,
  combineSlices,
  configureStore
} from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import feedReducer from './slices/feedSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import burgerReducer from './slices/constructorSlice';
import profileOrderReducer from './slices/profileOrderSlice';

const rootReducer = combineReducers({
  feed: feedReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: burgerReducer,
  profileOrders: profileOrderReducer,
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
