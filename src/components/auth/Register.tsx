import { useState } from 'react';
import MyButton from '../UI/my-button/MyButton';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth123 } from '../../firebase/config';
import { useNavigate } from 'react-router';
import { db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [repeatpassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      age === '' ||
      name === '' ||
      lastName === '' ||
      email === '' ||
      gender === '' ||
      password === '' ||
      repeatpassword === ''
    ) {
      setError('Some of the inputs are empty');
      return;
    } else if (password !== repeatpassword) {
      setError('Passwords doesnt match');
      return;
    } else {
      setError('');
    }

    createUserWithEmailAndPassword(auth123, email, password)
      .then((userCredential) => {
        const userWritten = {
          name: name,
          lastName: lastName,
          email: email,
          gender: gender,
          password: password,
          uid: userCredential.user.uid,
          age: age,
        };

        addUserFirestore(userWritten);
        navigate('/sign-in');
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  const addUserFirestore = async (userWritten: any) => {
    await setDoc(doc(db, 'users', `${userWritten.uid}`), userWritten);
  };

  return (
    <div className="w-full h-full bg-white">
      <form onSubmit={handleSignUp} className="w-[300px] flex flex-col p-5 gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-[30px] border ps-2"
          placeholder="Name"
          type="text"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="h-[30px] border ps-2"
          placeholder="Lastname"
          type="text"
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="h-[30px] border ps-2"
          placeholder="Age"
          type="number"
        />
        <div className="flex">
          <p>Gender: </p>
          <select className="ms-2" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Unknown">I'd rather not say</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
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
        <input
          value={repeatpassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          className="h-[30px] border ps-2"
          placeholder="Repeat password"
          type="password"
        />
        <Link className="text-center" to="/sign-in">
          <small className="text-gray-500">Have an account? Sign In</small>
        </Link>
        <MyButton type="submit">Sign Up</MyButton>
        <span className="text-center text-red-600 font-semibold">{error}</span>
      </form>
    </div>
  );
}

export default Register;
