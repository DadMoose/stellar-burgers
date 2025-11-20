import { RootState } from '../store';

export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedLoading = (state: RootState) => state.feed.loading;
export const selectFeedTotals = (state: RootState) => ({
  total: state.feed.total,
  totalToday: state.feed.totalToday
});

export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectIngredientsLoading = (state: RootState) => state.ingredients.loading;

export const selectConstructorItems = (state: RootState) => state.burgerConstructor;

export const selectProfileOrders = (state: RootState) => state.profileOrders.orders;
export const selectProfileOrdersLoading = (state: RootState) => state.profileOrders.loading;

export const selectOrderModalData = (state: RootState) => state.order.orderModalData;
export const selectOrderRequest = (state: RootState) => state.order.orderRequest;

export const selectUserData = (state: RootState) => state.user.user;
export const selectUserAuthError = (state: RootState) => state.user.authError;
export const selectUpdateUserError = (state: RootState) => state.user.updateUserError;
export const selectIsAuthChecked = (state: RootState) => state.user.isAuthChecked;
