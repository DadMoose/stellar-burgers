import { TOrdersData } from '@utils-types';
import reducer, { fetchFeed } from './feedSlice';

const mockFeed: TOrdersData = {
  orders: [
    {
      _id: '1',
      status: 'done',
      name: 'Order 1',
      createdAt: '2025-11-26',
      updatedAt: '2025-11-26',
      number: 1,
      ingredients: ['bun-1', 'main-1', 'sauce-1']
    }
  ],
  total: 567,
  totalToday: 10
};

describe('feedSlice', () => {
  it('устанавливает loading при pending', () => {
    const state = reducer(undefined, fetchFeed.pending('', undefined));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('сохраняет данные при fulfilled', () => {
    const state = reducer(
      undefined,
      fetchFeed.fulfilled(mockFeed, '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockFeed.orders);
    expect(state.total).toEqual(567);
    expect(state.totalToday).toEqual(10);
  });

  it('устанавливает ошибку при rejected', () => {
    const state = reducer(
      undefined,
      fetchFeed.rejected(new Error('Ошибка'), '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
