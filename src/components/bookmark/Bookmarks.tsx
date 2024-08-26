import { contextData } from '../../context/context';
import { useContext, useEffect, useState } from 'react';
import PostWrapper from '../posts/PostWrapper';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

function Bookmarks() {
  const { bookmarks, setBookmarks, userLoggedInfo, fetchedBooks } = useContext(contextData);
  const [loaded, setLoaded] = useState(false);
  const [deleteBooksUpdate, setDeleteBooksUpdate] = useState(0);

  const [posts, setPosts] = useState<any>([]);
  const [userBookmarks, setUserBookmarks] = useState<any>([]);

  useEffect(() => {
    fetchedBooks && getBookmarks();
  }, [fetchedBooks]);

  const getBookmarks = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));

    querySnapshot.forEach((item: any) => {
      bookmarks.map((itemBooks: any) => {
        if (item.id === itemBooks) {
          setUserBookmarks((prev: any) => [...prev, item.data()]);
        }
      });
    });
    setLoaded(true);
  };

  const deletePost = async (itemUid: string) => {
    await deleteDoc(doc(db, 'posts', `${itemUid}`));
    setPosts(posts.filter((item: any) => item.id !== itemUid));
  };

  const deleteFromBookmarks = async (itemcb: any) => {
    setBookmarks(bookmarks.filter((item: any) => item !== itemcb.id));
    setUserBookmarks(userBookmarks.filter((item: any) => item.id !== itemcb.id));
    setDeleteBooksUpdate(deleteBooksUpdate + 1);
  };

  useEffect(() => {
    deleteBookmarkEffect();
  }, [deleteBooksUpdate]);

  async function deleteBookmarkEffect() {
    if (deleteBooksUpdate === 0) return;
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
