import PostWrapper from '../posts/PostWrapper';
import { useContext, useEffect, useState } from 'react';
import { contextData } from '../../context/context';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

function Feed() {
  const { deletePost, bookmarks, setBookmarks, userLoggedInfo } = useContext(contextData);
  const [updateFeed, setUpdateFeed] = useState(0);
  const [posts, setPosts] = useState<any>([]);
  const [fetched, setFetched] = useState(false);

  const deleteFromBookmarks = async (itemcb: any) => {
    setBookmarks(bookmarks.filter((item: any) => item.id !== itemcb.id));
    setUpdateFeed(updateFeed + 1);
  };

  useEffect(() => {
    !fetched && getAllPosts();
  }, []);

  useEffect(() => {
    foo();
  }, [updateFeed]);

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));

    querySnapshot.forEach((doc: any) => {
      setPosts((prev: any) => [...prev, { ...doc.data(), id: doc.id }]);
      setFetched(true);
    });
  };

  async function foo() {
    if (updateFeed === 0) return;
    const ref = doc(db, 'users', `${userLoggedInfo.uid}`);

    await updateDoc(ref, {
      bookmarks: [...bookmarks],
    });
  }

  return (
    <div className="w-full h-full bg-white">
      {fetched ? (
        <PostWrapper
          deletePost={deletePost}
          posts={posts}
          deleteFromBookmarks={deleteFromBookmarks}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Feed;
