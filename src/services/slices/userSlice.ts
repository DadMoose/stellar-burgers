import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type UserState = {
  user: TUser | null;
  authError: string | null;
  updateUserError: string | null;
  isAuthChecked: boolean;
  request: boolean;
};

const initialState: UserState = {
  user: null,
  authError: null,
  updateUserError: null,
  isAuthChecked: false,
  request: false
};

const saveTokens = (refreshToken: string, accessToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
  setCookie('accessToken', accessToken);
};

const clearTokens = () => {
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
};

export const registerUser = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('users/register', async (form, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(form);
    saveTokens(response.refreshToken, response.accessToken);
    return response.user;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const loginUser = createAsyncThunk<
  TUser,
  TLoginData,
  { rejectValue: string }
>('users/login', async (form, { rejectWithValue }) => {
  try {
    const response = await loginUserApi(form);
    saveTokens(response.refreshToken, response.accessToken);
    return response.user;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch (err) {
      clearTokens();
      return rejectWithValue((err as Error).message);
    }
    clearTokens();
  }
);

export const getUser = createAsyncThunk<TUser, void, { rejectValue: string }>(
  'user/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateUser = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { rejectValue: string }
>('user/update', async (form, { rejectWithValue }) => {
  try {
    const response = await updateUserApi(form);
    return response.user;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const chekUserAuth = createAsyncThunk('user/chek', async (_, { dispatch }) => {
  if (localStorage.getItem('refreshToken')) {
    try {
      await dispatch(getUser()).unwrap();
    } catch {
      clearTokens();
    }
  }
  return true;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.request = true;
        state.authError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.request = false;
        state.authError =
          action.payload ||
          action.error.message ||
          'Не удалось зарегистрироваться';
      })
      .addCase(loginUser.pending, (state) => {
        state.request = true;
        state.authError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.request = false;
        state.authError =
          action.payload || action.error.message || 'Не удалось залогиниться';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateUserError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.updateUserError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserError =
          action.payload ||
          action.error.message ||
          'Не удалось обновить данные';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(chekUserAuth.fulfilled, (state) => {
        state.isAuthChecked = true;
      });
  }
});

export default userSlice.reducer;
