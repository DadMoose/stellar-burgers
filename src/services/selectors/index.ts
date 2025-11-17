import { RootState } from '../store';

export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedLoading = (state: RootState) => state.feed.loading;
export const selectFeedTotals = (state: RootState) => ({
  total: state.feed.total,
  totalToday: state.feed.totalToday
});
