import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import {
  selectFeedOrders,
  selectIngredients,
  selectOrderDetails,
  selectProfileOrders
} from '@selectors';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrderByNumber,
  setOrderDetails
} from '../../services/slices/orderDetailsSlice';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();
  const orderData = useSelector(selectOrderDetails);
  const ingredients = useSelector(selectIngredients);
  const feedOrders = useSelector(selectFeedOrders);
  const profileOrders = useSelector(selectProfileOrders);

  useEffect(() => {
    if (!number) return;
    const orderNumber = Number(number);
    const combined = [...feedOrders, ...profileOrders];
    const existingOrder = combined.find((item) => item.number === orderNumber);
    if (existingOrder) {
      dispatch(setOrderDetails(existingOrder));
      return;
    }
    dispatch(fetchOrderByNumber(orderNumber));
  }, [number, feedOrders, profileOrders, dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return (
    <>
      {number && (
        <p
          className='text text_type_digits-medium'
          style={{ alignSelf: 'flex-start' }}
        >
          #{String(number).padStart(6, '0')}
        </p>
      )}
      <OrderInfoUI orderInfo={orderInfo} />
    </>
  );
};
