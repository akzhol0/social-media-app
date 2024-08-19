import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router';
import { db } from '../../firebase/config';
import { useEffect, useState } from 'react';

function UserForeign() {
  const { uid } = useParams();
  const [userInfo, setUserInfo] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);

  const getUserData = async () => {
    const docRef = doc(db, 'users', `${uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserInfo(docSnap.data());
      setLoaded(true);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col xl:flex-row bg-white my-2 items-center xl:items-start">
      {loaded ? (
        <div className="w-full h-full bg-white">
          <div className="flex flex-col md:flex-row">
            <div className="min-w-[300px] h-[300px]">
              <img
                className="w-full h-full object-contain"
                src={`/img/${userInfo.gender}.png`}
                alt="profile picture"
              />
            </div>
            <div className="flex flex-col px-4 py-2 md:px-0 md:py-2">
              <p>
                Name: {userInfo.name} {userInfo.lastName}
              </p>
              <p>Age: {userInfo.age}</p>
              {userInfo.gender !== 'Unknown' && <p>Gender: {userInfo.gender}</p>}
              <p>Email: {userInfo.email}</p>
            </div>
          </div>
          {/* <div>
            <p className="text-center text-[30px]">{userLoggedInfo.name}'s posts</p>
            {loaded ? (
              <PostWrapper deletePost={deletePost} posts={posts} />
            ) : (
              <p className="text-center text-[20px]">Empty</p>
            )}
          </div> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserForeign;
