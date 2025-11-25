import { TIngredient } from '@utils-types';
import reducer, { fetchIngredients } from './ingredientsSlice';

const mockIngredients: TIngredient[] = [
  {
    _id: 'bun',
    name: 'Булка обыкновенная',
    type: 'bun',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 9999,
    price: 1,
    image: '',
    image_large: '',
    image_mobile: ''
  }
];

describe('ingredientsSlice', () => {
  it('устанавливает loading при pending', () => {
    const state = reducer(undefined, fetchIngredients.pending('', undefined));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('сохраняет данные при fulfilled', () => {
    const state = reducer(
      undefined,
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
  });

  it('устанавливает ошибку при rejected', () => {
    const state = reducer(
      undefined,
      fetchIngredients.rejected(new Error('Ошибка'), '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
