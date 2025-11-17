import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import { TIngredient, TConstructorIngredient } from '@utils-types';

type ConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
        return;
      }
      state.ingredients.push({
        ...action.payload,
        id: uuid()
      });
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      if (
        from === to ||
        from < 0 ||
        to < 0 ||
        from >= state.ingredients.length ||
        to >= state.ingredients.length
      ) {
        return;
      }
      const updated = [...state.ingredients];
      const [movedItem] = updated.splice(from, 1);
      updated.splice(to, 0, movedItem);
      state.ingredients = updated;
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
