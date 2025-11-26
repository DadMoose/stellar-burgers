import { TOrder } from '@utils-types';
import reducer, {
  fetchOrderByNumber,
  setOrderDetails
} from './orderDetailsSlice';

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Order 1',
  createdAt: '2025-11-26',
  updatedAt: '2025-11-26',
  number: 1,
  ingredients: ['bun-1', 'main-1', 'sauce-1']
};

describe('orderDetailsSlice', () => {
  it('проставляет заказ', () => {
    const state = reducer(undefined, setOrderDetails(mockOrder));
    expect(state.data).toEqual(mockOrder);
    expect(state.error).toBeNull();
  });

  it('устанавливает loading при pending', () => {
    const state = reducer(undefined, fetchOrderByNumber.pending('', 1));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('сохраняет данные при fulfilled', () => {
    const state = reducer(
      undefined,
      fetchOrderByNumber.fulfilled(mockOrder, '', 1)
    );
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockOrder);
  });

  it('устанавливает ошибку при rejected', () => {
    const state = reducer(
      undefined,
      fetchOrderByNumber.rejected(new Error('Ошибка'), '', 1)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
