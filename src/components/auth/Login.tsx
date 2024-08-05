import { useContext, useState } from 'react';
import MyButton from '../UI/my-button/MyButton';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth123, db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { contextData } from '../../context/context';

function Login() {
  const navigate = useNavigate();
  const { setUserLoggedInfo, setUserLogged } = useContext(contextData);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth123, email, password)
      .then((userCredential) => {
        getUserData(userCredential);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  const getUserData = async (userCredential: any) => {
    const docRef = doc(db, 'users', `${userCredential.user.uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserLoggedInfo(docSnap.data());
      setUserLogged(true);
      localStorage.setItem('uid', userCredential.user.uid);
      navigate('/user-profile');
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <form onSubmit={handleSignIn} className="w-[300px] flex flex-col p-5 gap-2">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-[30px] border ps-2"
          placeholder="Email"
          type="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-[30px] border ps-2"
          placeholder="Password"
          type="password"
        />
        <Link className="text-center" to="/sign-up">
          <small className="text-gray-500">Don't have an account yet? Sign Up</small>
        </Link>
        <MyButton type="submit">Sign In</MyButton>
        <span className="text-center text-red-600 font-semibold">{error}</span>
      </form>
    </div>
  );
}

export default Login;
