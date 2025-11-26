import { TUser } from '@utils-types';
import reducer, { loginUser, logoutUser } from './userSlice';

const mockUser: TUser = {
  email: 'test@test.com',
  name: 'test'
};

describe('userSlice', () => {
  it('ставит request при login pending', () => {
    const state = reducer(
      undefined,
      loginUser.pending('', { email: '', password: '' })
    );
    expect(state.request).toBe(true);
    expect(state.authError).toBeNull();
  });

  it('сохраняет данные пользователя при login fulfilled', () => {
    const state = reducer(
      undefined,
      loginUser.fulfilled(mockUser, '', { email: '', password: '' })
    );
    expect(state.request).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('устанавливает ошибку при login rejected', () => {
    const state = reducer(
      undefined,
      loginUser.rejected(new Error('Ошибка логина'), '', {
        email: '',
        password: ''
      })
    );
    expect(state.request).toBe(false);
    expect(state.authError).toBe('Ошибка логина');
  });

  it('обнуляет пользователя при logout fulfilled', () => {
    const filledState = {
      ...reducer(undefined, { type: '' }),
      user: mockUser,
      isAuthChecked: true
    };
    const state = reducer(filledState, logoutUser.fulfilled(undefined, ''));
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });
});
