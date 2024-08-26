import { useContext, useEffect, useState } from 'react';
import { contextData } from '../../context/context';
import { useNavigate } from 'react-router';
import MyButton from '../UI/my-button/MyButton';
import MyPrimaryButton from '../UI/my-button/MyPrimaryButton';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import PostWrapper from '../posts/PostWrapper';

function User() {
  const { userLogged, userLoggedInfo, setUserLogged, setUserLoggedInfo, bookmarks, setBookmarks } =
    useContext(contextData);
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState<any>([]);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    !userLogged && navigate('/sign-in');
    getUserPosts();
  }, []);

  const deleteUserPost = async (itemUid: string) => {
    await deleteDoc(doc(db, 'posts', `${itemUid}`));
    setUserPosts(userPosts.filter((item: any) => item.id !== itemUid));
  };

  const getUserPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));

    querySnapshot.forEach((doc: any) => {
      if (doc.data().userInfo.uid === userLoggedInfo.uid) {
        setUserPosts((prev: any) => [...prev, { ...doc.data(), id: doc.id }]);
      }
    });
  };

  const deleteFromBookmarks = async (itemcb: any) => {
    setBookmarks(bookmarks.filter((item: any) => item !== itemcb.id));
    setUpdate(update + 1);
  };

  useEffect(() => {
    deleteBookmarkEffect();
  }, [update]);

  async function deleteBookmarkEffect() {
    if (update === 0) return;
    const ref = doc(db, 'users', `${userLoggedInfo.uid}`);

    await updateDoc(ref, {
      bookmarks: [...bookmarks],
    });
  }

  return (
    <div className="w-full h-full bg-white">
      <div className="flex flex-col md:flex-row">
        <div className="min-w-[300px] h-[300px] flex justify-center">
          <img
            className="w-[80%] md:w-full flex justify-center h-full object-cover"
            src={
              userLoggedInfo.avatar === ''
                ? `/img/${userLoggedInfo.gender}.png`
                : userLoggedInfo.avatar
            }
            alt="profile picture"
          />
        </div>
        <div className="flex flex-col px-4 py-2 md:px-0 md:py-2 ms-2">
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
          <Link to="/user-profile/edit-profile">
            <MyPrimaryButton className="w-full mt-2">Edit Profile</MyPrimaryButton>
          </Link>
        </div>
      </div>
      <div>
        <p className="text-center text-[30px]">{userLoggedInfo.name}'s posts</p>
        <PostWrapper deleteFromBookmarks={deleteFromBookmarks} deletePost={deleteUserPost} posts={userPosts} />
      </div>
    </div>
  );
}

export default User;
