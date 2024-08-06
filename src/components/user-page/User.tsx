import { useContext, useEffect, useState } from 'react';
import { contextData } from '../../context/context';
import { useNavigate } from 'react-router';
import MyButton from '../UI/my-button/MyButton';
import MyPrimaryButton from '../UI/my-button/MyPrimaryButton';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import PostWrapper from '../posts/PostWrapper';

function User() {
  const { userLogged, userLoggedInfo, setUserLogged, setUserLoggedInfo } = useContext(contextData);
  const navigate = useNavigate();

  const [posts, setPosts] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    !userLogged && navigate('/sign-in');
    getUserPosts();
  }, []);

  const deletePost = async (itemUid: string) => {
    await deleteDoc(doc(db, 'posts', `${itemUid}`));
    setPosts(posts.filter((item: any) => item.id !== itemUid));
  };

  const getUserPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));

    querySnapshot.forEach((doc: any) => {
      const response = doc.data();

      if (response.userInfo.uid === userLoggedInfo.uid) {
        setPosts((prev: any) => [...prev, { ...response, id: doc.id }]);
        setLoaded(true);
      }
    });
  };

  return (
    <div className="w-full h-full bg-white">
      <div className="flex flex-col md:flex-row">
        <div className="min-w-[300px] h-[300px]">
          <img
            className="w-full h-full object-contain"
            src={`/img/${userLoggedInfo.gender}.png`}
            alt="profile picture"
          />
        </div>
        <div className="flex flex-col px-4 py-2 md:px-0 md:py-2">
          <p>
            Name: {userLoggedInfo.name} {userLoggedInfo.lastName}
          </p>
          <p>Age: {userLoggedInfo.age}</p>
          {userLoggedInfo.gender !== 'Unknown' && <p>Gender: {userLoggedInfo.gender}</p>}
          <p>Email: {userLoggedInfo.email}</p>
          <span
            onClick={() => {
              setUserLogged(false);
              setUserLoggedInfo([]);
              localStorage.removeItem('uid');
              navigate('/sign-in');
            }}>
            <MyButton className="w-full mt-2">Exit</MyButton>
          </span>
          <Link to="/post-creation">
            <MyPrimaryButton className="w-full mt-2">Create Post</MyPrimaryButton>
          </Link>
        </div>
      </div>
      <div>
        <p className="text-center text-[30px]">{userLoggedInfo.name}'s posts</p>
        {loaded ? (
          <PostWrapper deletePost={deletePost} posts={posts} />
        ) : (
          <p className="text-center text-[20px]">Empty</p>
        )}
      </div>
    </div>
  );
}

export default User;
