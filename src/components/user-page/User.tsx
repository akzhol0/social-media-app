import { useContext, useEffect } from 'react';
import { contextData } from '../../context/context';
import { useNavigate } from 'react-router';
import MyButton from '../UI/my-button/MyButton';

function User() {
  const { userLogged, userLoggedInfo, setUserLogged, setUserLoggedInfo } = useContext(contextData);
  const navigate = useNavigate();

  useEffect(() => {
    !userLogged && navigate('/sign-in');
  }, []);

  return (
    <div className="w-full h-full bg-white">
      {userLoggedInfo.email}
      <span
        onClick={() => {
          setUserLogged(false);
          setUserLoggedInfo([]);
          localStorage.removeItem('uid');
          navigate('/sign-in');
        }}>
        <MyButton>Exit</MyButton>
      </span>
    </div>
  );
}

export default User;
