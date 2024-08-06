import { collection, getDocs } from 'firebase/firestore';
import PostWrapper from '../posts/PostWrapper';
import { db } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';

function Feed() {
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

  return (
    <div className="w-full h-full bg-white overflow-x-scroll">
      {loaded ? <PostWrapper deletePost={deletePost} posts={posts} /> : <p>Loading...</p>}
    </div>
  );
}

export default Feed;
