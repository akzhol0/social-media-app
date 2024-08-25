import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router';
import { db } from '../../firebase/config';
import { useContext, useEffect, useState } from 'react';
import PostWrapper from '../posts/PostWrapper';
import { contextData } from '../../context/context';

function UserForeign() {
  const { allPosts, setAllPosts, userLoggedInfo, bookmarks, setBookmarks } =
    useContext(contextData);
  const { uid } = useParams();
  const [userInfo, setUserInfo] = useState<any>([]);
  const [userPosts, setUserPosts] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);
  const [update, setUpdate] = useState(0);

  const getUserData = async () => {
    const docRef = doc(db, 'users', `${uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserInfo(docSnap.data());
      getUserPosts();
      setLoaded(true);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const deleteFromBookmarks = async (itemcb: any) => {
    setBookmarks(bookmarks.filter((item: any) => item !== itemcb.id));
    setUpdate(update + 1);
  };

  useEffect(() => {
    foo();
  }, [update]);

  async function foo() {
    if (update === 0) return;
    const ref = doc(db, 'users', `${userLoggedInfo.uid}`);

    await updateDoc(ref, {
      bookmarks: [...bookmarks],
    });
  }

  const getUserPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));

    querySnapshot.forEach((doc: any) => {
      const response = doc.data();

      if (response.userInfo.uid === uid) {
        setUserPosts((prev: any) => [...prev, { ...response, id: doc.id }]);
        setLoaded(true);
      }
    });
  };

  const deletePost = async (id: string) => {
    await deleteDoc(doc(db, 'posts', `${id}`));
    setUserPosts(userPosts.filter((item: any) => item.id !== id));
    setAllPosts(allPosts.filter((item: any) => item.id !== id));
  };

  return (
    <div className="w-full h-full flex flex-col xl:flex-row bg-white my-2 items-center xl:items-start">
      {loaded ? (
        <div className="w-full h-full bg-white">
          <div className="flex flex-col md:flex-row">
            <div className="min-w-[300px] h-[300px] flex justify-center">
              <img
                className="w-[80%] md:w-full h-full object-cover"
                src={userInfo.avatar === '' ? `/img/${userInfo.gender}.png` : userInfo.avatar}
                alt="profile picture"
              />
            </div>
            <div className="flex flex-col px-4 py-2 md:px-0 md:py-2 ms-2">
              <p>
                Name: {userInfo.name} {userInfo.lastName}
              </p>
              <p>Age: {userInfo.age}</p>
              {userInfo.gender !== 'Unknown' && <p>Gender: {userInfo.gender}</p>}
            </div>
          </div>
          <div>
            <p className="text-center text-[30px]">{userInfo.name}'s posts</p>
            {loaded ? (
              <PostWrapper
                deleteFromBookmarks={deleteFromBookmarks}
                deletePost={deletePost}
                posts={userPosts}
              />
            ) : (
              <p className="text-center text-[20px]">Empty</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserForeign;
