import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectProfileOrders, selectProfileOrdersLoading } from '@selectors';
import { fetchProfileOrders } from '../../services/slices/profileOrderSlice';
import { clearInterval } from 'node:timers';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectProfileOrders);
  const loading = useSelector(selectProfileOrdersLoading);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  if (!orders.length && loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
