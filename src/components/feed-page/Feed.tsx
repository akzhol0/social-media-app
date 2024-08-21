import { collection, getDocs, updateDoc } from 'firebase/firestore';
import PostWrapper from '../posts/PostWrapper';
import { db } from '../../firebase/config';
import { useContext, useEffect, useState } from 'react';
import { contextData } from '../../context/context';
import { doc, deleteDoc } from 'firebase/firestore';

function Feed() {
  const { bookmarks, userLoggedInfo, setBookmarks } = useContext(contextData);
  const [posts, setPosts] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);

  const deletePost = async (itemUid: string) => {
    await deleteDoc(doc(db, 'posts', `${itemUid}`));
    setPosts(posts.filter((item: any) => item.id !== itemUid));
  };

  useEffect(() => {
    !loaded && getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));

    querySnapshot.forEach((doc: any) => {
      setPosts((prev: any) => [...prev, { ...doc.data(), id: doc.id }]);
      setLoaded(true);
    });
  };

  async function foo() {
    if (bookmarks === undefined) {
      return;
    }

    const docrefref = doc(db, 'users', `${userLoggedInfo.uid}`);
    await updateDoc(docrefref, {
      bookmarks: [...bookmarks],
    });
  }

  useEffect(() => {
    foo();
  }, [bookmarks]);

  const deleteFromBookmarks = async (itemcb: any) => {
    setBookmarks(bookmarks.filter((item: any) => item.id !== itemcb.id));
  };

  return (
    <div className="w-full h-full bg-white">
      {loaded ? <PostWrapper deleteFromBookmarks={deleteFromBookmarks} deletePost={deletePost} posts={posts} /> : <p>Loading...</p>}
    </div>
  );
}

export default Feed;
