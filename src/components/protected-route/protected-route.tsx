import { useSelector } from '../../services/store';
import { selectIsAuthChecked, selectUserData } from '@selectors';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const user = useSelector(selectUserData);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (onlyUnAuth && user) {
    const state = location.state as { from?: Location };
    return <Navigate to={state?.from?.pathname || '/'} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={`/login`} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
