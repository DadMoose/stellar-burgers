import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import { selectUserAuthError } from '@selectors';
import { loginUser } from '../../services/slices/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authError = useSelector(selectUserAuthError) || '';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({email, password}))
    .unwrap()
    .then(() => {
      const from = (location.state as { from?: Location })?.from?.pathname;
      navigate(from || '/', {replace: true})
    })
    .catch(() => null);
  };

  return (
    <LoginUI
      errorText={authError}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
