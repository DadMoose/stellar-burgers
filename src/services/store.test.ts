import store, { rootReducer } from './store';

describe('rootReducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(store.getState());
  });
});
