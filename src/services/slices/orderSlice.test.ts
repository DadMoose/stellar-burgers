import { TOrder } from '@utils-types';
import reducer, { clearOrder, createOrder } from './orderSlice';

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Order 1',
  createdAt: '2025-11-26',
  updatedAt: '2025-11-26',
  number: 111,
  ingredients: ['bun-1', 'main-1', 'sauce-1']
};

describe('orderSlice', () => {
  it('очищает заказ по clearOrder', () => {
    const filledState = {
      ...reducer(undefined, { type: '' }),
      orderModalData: mockOrder,
      error: 'Ошибка'
    };
    const state = reducer(filledState, clearOrder());
    expect(state.orderModalData).toBeNull();
    expect(state.error).toBeNull();
  });

  it('устанавливает orderRequest при pending', () => {
    const state = reducer(undefined, createOrder.pending('', undefined));
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('сохраняет данные при fulfilled', () => {
    const state = reducer(
      undefined,
      createOrder.fulfilled(mockOrder, '', undefined)
    );
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  it('устанавливает ошибку при rejected', () => {
    const state = reducer(
      undefined,
      createOrder.rejected(new Error('Ошибка'), '', undefined, 'Не получилось')
    );
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Не получилось');
  });
});
