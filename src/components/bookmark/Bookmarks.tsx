import { contextData } from '../../context/context';
import { useContext, useEffect, useState } from 'react';
import PostWrapper from '../posts/PostWrapper';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

function Bookmarks() {
  const { bookmarks, deletePost, setBookmarks, userLoggedInfo } = useContext(contextData);
  const [update, setUpdate] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState<any>([]);

  const [userBookmarks, setUserBookmarks] = useState<any>([]);

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));

    querySnapshot.forEach((item: any) => {
      setPosts((prev: any) => [...prev, { ...item.data(), id: item.id }]);
    });
    setLoaded(true);
  };

  useEffect(() => {
    getNeedBookmarks(posts);
  }, [posts]);

  const getNeedBookmarks = (posts: any) => {
    posts.map((itemPost: any) => {
      bookmarks.map((itemBooks: any) => {
        if (itemPost.id === itemBooks) {
          setUserBookmarks((prev: any) => [...prev, itemPost]);
        }
      });
    });
  };

  const deleteFromBookmarks = async (itemcb: any) => {
    setBookmarks(bookmarks.filter((item: any) => item.id !== itemcb.id));
    setUpdate(update + 1);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

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

  return (
    <div className="w-full h-full bg-white">
      {loaded ? (
        <PostWrapper
          deletePost={deletePost}
          posts={userBookmarks}
          deleteFromBookmarks={deleteFromBookmarks}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Bookmarks;
