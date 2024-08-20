import { useContext, useState } from 'react';
import { contextData } from '../../context/context';
import MyPrimaryButton from '../UI/my-button/MyPrimaryButton';
import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';

function EditProfile() {
  const navigate = useNavigate();
  const { userLoggedInfo, checkUserRegistration } = useContext(contextData);
  const [userName, setUserName] = useState<string>(userLoggedInfo?.name);
  const [userLastName, setUserLastName] = useState<string>(userLoggedInfo?.lastName);
  const [userAge, setUserAge] = useState<number>(userLoggedInfo?.age);
  const [userPfp, setUserPfp] = useState(userLoggedInfo.avatar === '' ? '' : userLoggedInfo.avatar);

  async function ChangeProfile() {
    const ref = doc(db, 'users', `${userLoggedInfo.uid}`);

    await updateDoc(ref, {
      name: userName,
      lastName: userLastName,
      age: userAge,
      avatar: userPfp,
    });

    checkUserRegistration();
    navigate('/user-profile');
  }

  return (
    <div className="w-full h-full flex justify-center">
      <section className="flex flex-col lg:flex-row items-center lg:items-start gap-2 py-4">
        <div className="w-[200px] h-[200px] overflow-hidden rounded-[50%]">
          <img
            className="w-full h-full"
            src={
              userLoggedInfo.avatar === ''
                ? `/img/${userLoggedInfo.gender}.png`
                : userLoggedInfo.avatar
            }
            alt="profile picture"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <span className="flex">
            <p className="min-w-[120px] flex justify-end pe-2">Name:</p>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={userLoggedInfo.name}
              className="w-[200px] md:w-[300px] h-[30px] border rounded ps-2"
              type="text"
            />
          </span>
          <span className="flex">
            <p className="min-w-[120px] flex justify-end pe-2">Last Name:</p>
            <input
              value={userLastName}
              onChange={(e) => setUserLastName(e.target.value)}
              placeholder={userLoggedInfo.lastName}
              className="w-[200px] md:w-[300px] h-[30px] border rounded ps-2"
              type="text"
            />
          </span>
          <span className="flex">
            <p className="min-w-[120px] flex justify-end pe-2">Age:</p>
            <input
              value={userAge}
              onChange={(e) => setUserAge(Number(e.target.value))}
              placeholder={userLoggedInfo.age}
              className="w-[200px] md:w-[300px] h-[30px] border rounded ps-2"
              type="number"
            />
          </span>
          <span className="flex">
            <p className="min-w-[120px] flex justify-end pe-2">Profile picture:</p>
            <input
              value={userPfp}
              onChange={(e) => setUserPfp(e.target.value)}
              placeholder="Profile picture link"
              className="w-[200px] md:w-[300px] h-[30px] border rounded ps-2"
              type="text"
            />
          </span>
          <span onClick={() => ChangeProfile()}>
            <MyPrimaryButton className="w-full">Change</MyPrimaryButton>
          </span>
        </div>
      </section>
    </div>
  );
}

export default EditProfile;
