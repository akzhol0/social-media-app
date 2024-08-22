import PostWrapper from '../posts/PostWrapper';
import { useContext, useEffect, useState } from 'react';
import { contextData } from '../../context/context';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

function Feed() {
  const { allPosts, deletePost, bookmarks, setBookmarks, userLoggedInfo } = useContext(contextData);
  const [updateFeed, setUpdateFeed] = useState(0);

  const deleteFromBookmarks = async (itemcb: any) => {
    setBookmarks(bookmarks.filter((item: any) => item.id !== itemcb.id));
    setUpdateFeed(updateFeed + 1);
  };

  useEffect(() => {
    foo();
  }, [updateFeed]);

  async function foo() {
    if (updateFeed === 0) return;
    const ref = doc(db, 'users', `${userLoggedInfo.uid}`);

    await updateDoc(ref, {
      bookmarks: [...bookmarks],
    });
  }

  return (
    <div className="w-full h-full bg-white">
      <PostWrapper
        deletePost={deletePost}
        posts={allPosts}
        deleteFromBookmarks={deleteFromBookmarks}
      />
    </div>
  );
}

export default Feed;
