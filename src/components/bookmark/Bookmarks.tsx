import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { contextData } from '../../context/context';
import { useContext, useEffect } from 'react';
import PostWrapper from '../posts/PostWrapper';

function Bookmarks() {
  const { userLoggedInfo, bookmarks, setBookmarks, booksLoaded } = useContext(contextData);

  const deletePost = (id: string) => {
    console.log(id);
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
      {booksLoaded ? (
        bookmarks.length ? (
          <>
            <PostWrapper
              deletePost={deletePost}
              posts={bookmarks}
              deleteFromBookmarks={deleteFromBookmarks}
            />
          </>
        ) : (
          <h1>Empty</h1>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Bookmarks;
