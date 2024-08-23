import { contextData } from '../../context/context';
import { useContext, useEffect, useState } from 'react';
import PostWrapper from '../posts/PostWrapper';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

function Bookmarks() {
  const { bookmarks, deletePost, setBookmarks, userLoggedInfo, allPosts } = useContext(contextData);
  const [update, setUpdate] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [userBookmarks, setUserBookmarks] = useState<any>([]);

  const getNeedBookmarks = () => {
    allPosts.map((itemPost: any) => {
      bookmarks.map((itemBooks: any) => {
        if (itemPost.id === itemBooks) {
          setUserBookmarks((prev: any) => [...prev, itemPost]);
        }
      });
    });

    setLoaded(true);
  };

  const deleteFromBookmarks = async (itemcb: any) => {
    setBookmarks(bookmarks.filter((item: any) => item.id !== itemcb.id));
    setUpdate(update + 1);
  };

  useEffect(() => {
    foo();
    getNeedBookmarks();
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
