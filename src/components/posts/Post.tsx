import { useContext, useEffect, useState } from 'react';
import { contextData } from '../../context/context';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Link } from 'react-router-dom';

type PostProps = {
  item: any;
  deletePost: (arg0: string) => void;
  deleteFromBookmarks?: (arg0: any) => void;
};

function Post({ item, deletePost, deleteFromBookmarks }: PostProps) {
  const { userLoggedInfo, userLogged, bookmarks, setBookmarks, fetchedBooks } =
    useContext(contextData);
  const [modal, setModal] = useState(false);
  const [addedToBoomarks, setAddedToBoomarks] = useState(false);

  const [liked, setLiked] = useState(false);
  const [likedUsers, setLikedUsers] = useState<any>([]);
  const [likesAmount, setLikesAmount] = useState(item.likes.length);

  const [fetched, setFetched] = useState(0);

  const [update, setUpdate] = useState(0);

  useEffect(() => {
    getLikes();
  }, []);

  const getLikes = async () => {
    setLikedUsers(item.likes);
    setFetched(fetched + 1);
  };

  useEffect(() => {
    if (fetchedBooks === 0) return;
    checkIfPostAddedToBookmarks();
  }, [fetchedBooks]);

  useEffect(() => {
    if (fetched === 0) return;
    checkIfLiked();
  }, [fetched]);

  useEffect(() => {
    if (update === 0) return;
    foo();
  }, [update]);

  const addToBookmarks = async () => {
    setBookmarks((prev: any) => [...prev, item.id]);
    const docrefref = doc(db, 'users', `${userLoggedInfo.uid}`);

    const foo = async (bookmarkscb: any) => {
      await updateDoc(docrefref, {
        bookmarks: [...bookmarkscb, item.id],
      });
    };

    const docRef = doc(db, 'users', `${userLoggedInfo.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      foo(docSnap.data().bookmarks);
    }
  };

  const checkIfPostAddedToBookmarks = async () => {
    if (bookmarks === undefined) return;

    await bookmarks.map((itemcb: any) => {
      if (itemcb === item.id) {
        setAddedToBoomarks(true);
      }
    });
  };

  const checkIfLiked = async () => {
    if (likedUsers === undefined || likedUsers.length === 0) return;

    await likedUsers.map((itemcb: any) => {
      if (itemcb.uid === userLoggedInfo.uid) {
        setLiked(true);
      }
    });
  };

  async function foo() {
    const ref = doc(db, 'posts', `${item.id}`);
    await updateDoc(ref, {
      likes: [...likedUsers],
    });
  }

  async function dislike() {
    setLiked(false);
    setLikesAmount(likesAmount - 1);

    setLikedUsers(likedUsers.filter((itemcb: any) => itemcb.uid !== userLoggedInfo.uid));
    setUpdate(update + 1);
  }

  async function like() {
    setLiked(true);
    setLikesAmount(likesAmount + 1);

    const ref = doc(db, 'posts', `${item.id}`);
    await updateDoc(ref, {
      likes: [...likedUsers, userLoggedInfo],
    });
    setLikedUsers((prev: any) => [...prev, item]);
  }

  return (
    <div className="w-full min-h-[500px] flex flex-col xl:flex-row bg-white my-2 items-center xl:items-start">
      <div className="relative flex max-w-[350px] min-w-[350px] h-[400px] md:max-w-[500px] md:min-w-[500px] md:h-[500px]">
        <img
          className="w-full h-full object-cover border bg-gray-200"
          src={item.image}
          alt="post logo"
        />
        <div className="absolute flex justify-center items-center bottom-0 right-2 w-[80px] h-[60px] overflow-hidden">
          <p className="bg-black px-2 text-white rounded">{likesAmount}</p>
          <img
            onClick={liked ? () => dislike() : () => like()}
            className="w-full h-full cursor-pointer"
            src={liked ? '/img/heart-full.png' : '/img/heart-empty.png'}
            alt="like"
          />
        </div>
      </div>
      <div className="flex flex-col ps-2">
        <div className="flex items-center">
          <div className="max-w-[40px] max-h-[40px] rounded-[50%] border border-gray-600 overflow-hidden">
            <img
              className="w-full h-full"
              src={
                item.userInfo.avatar === ''
                  ? `/img/${item.userInfo.gender}.png`
                  : item.userInfo.avatar
              }
              alt="pfp"
            />
          </div>
          <div className="w-full md:w-[400px] flex flex-col ms-2 justify-center">
            <div className="w-[200px] h-[22px] overflow-hidden">{item.date}</div>
            <Link to={`/user/${item.userInfo.uid}`}>
              <span className="hover:underline">
                {item.userInfo.name} {item.userInfo.lastName}
              </span>
            </Link>
          </div>
          <div
            onClick={() => setModal(modal ? false : true)}
            className="relative ms-2 text-[30px] cursor-pointer mb-4 me-2">
            ...
            {modal && (
              <div className="absolute right-0 w-[170px] flex flex-col bg-gray-200 text-[16px]">
                {userLoggedInfo.uid === item.userInfo.uid && (
                  <p onClick={() => deletePost(item.id)} className="hover:bg-gray-300">
                    Delete Post
                  </p>
                )}
                {userLogged && (
                  <span className="hover:bg-gray-300">
                    {addedToBoomarks ? (
                      <p
                        onClick={() => {
                          deleteFromBookmarks ? deleteFromBookmarks(item) : console.log('123');
                          setAddedToBoomarks(false);
                        }}>
                        Delete from Bookmarks
                      </p>
                    ) : (
                      <p
                        onClick={() => {
                          addToBookmarks();
                          setAddedToBoomarks(true);
                        }}>
                        Add to Bookmarks
                      </p>
                    )}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <h1 className="font-semibold text-[30px]">{item.header}</h1>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export default Post;
