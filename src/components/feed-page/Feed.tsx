import PostWrapper from '../posts/PostWrapper';
import { useContext, useEffect, useState } from 'react';
import { contextData } from '../../context/context';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

function Feed() {
  const { bookmarks, setBookmarks, userLoggedInfo } = useContext(contextData);
  const [update, setUpdate] = useState(0);
  const [posts, setPosts] = useState<any>([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    !fetched && getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));

    querySnapshot.forEach((doc: any) => {
      setPosts((prev: any) => [...prev, { ...doc.data(), id: doc.id }]);
      setFetched(true);
    });
  };

  const deletePost = async (itemUid: string) => {
    await deleteDoc(doc(db, 'posts', `${itemUid}`));
    setPosts(posts.filter((item: any) => item.id !== itemUid));
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
