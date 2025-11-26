import { TOrder } from '@utils-types';
import reducer, { fetchProfileOrders } from './profileOrderSlice';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Profile Order',
    createdAt: '2025-11-26',
    updatedAt: '2025-11-26',
    number: 1,
    ingredients: ['bun-1', 'main-1', 'sauce-1']
  }
];

describe('profileOrderSlice', () => {
  it('устанавливает loading при pending', () => {
    const state = reducer(undefined, fetchProfileOrders.pending('', undefined));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('сохраняет данные при fulfilled', () => {
    const state = reducer(
      undefined,
      fetchProfileOrders.fulfilled(mockOrders, '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it('устанавливает ошибку при rejected', () => {
    const state = reducer(
      undefined,
      fetchProfileOrders.rejected(new Error('Ошибка'), '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
