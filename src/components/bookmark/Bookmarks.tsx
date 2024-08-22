import { contextData } from '../../context/context';
import { useContext, useEffect, useState } from 'react';
import PostWrapper from '../posts/PostWrapper';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

function Bookmarks() {
  const { bookmarks, deletePost, setBookmarks, userLoggedInfo } = useContext(contextData);
  const [update, setUpdate] = useState(0);

  const deleteFromBookmarks = async (itemcb: any) => {
    setBookmarks(bookmarks.filter((item: any) => item.id !== itemcb.id));
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

  return (
    <div className="w-full h-full bg-white">
      <PostWrapper
        deletePost={deletePost}
        posts={bookmarks}
        deleteFromBookmarks={deleteFromBookmarks}
      />
    </div>
  );
}

export default Bookmarks;
