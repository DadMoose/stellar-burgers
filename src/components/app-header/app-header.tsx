import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectUserData } from '@selectors';


export const AppHeader: FC = () => {
  const user = useSelector(selectUserData);

  return <AppHeaderUI userName={user?.name} />;
}

