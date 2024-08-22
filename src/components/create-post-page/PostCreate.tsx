import { useContext, useState } from 'react';
import { contextData } from '../../context/context';
import { useNavigate } from 'react-router';
import MyPrimaryButton from '../UI/my-button/MyPrimaryButton';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

function PostCreate() {
  const { userLogged, userLoggedInfo, setAllPosts } = useContext(contextData);
  const navigate = useNavigate();

  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const addPosts = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const post = {
      userInfo: {
        ...userLoggedInfo,
      },
      header: header,
      description: description,
      date: Date(),
      image: image,
    };

    setAllPosts((prev: any) => [...prev, post]);
    addFirebase(post);
    navigate('/user-profile');

    // setTimeout(() => {
    //   location.reload();
    // }, 100);
  };

  const addFirebase = async (post: any) => {
    await setDoc(doc(db, 'posts', `${Math.random()}`), post);
  };

  return (
    <div className="w-full h-full flex bg-white flex-col">
      <form onSubmit={addPosts} className="flex flex-col p-4 items-center">
        <div className="flex flex-col gap-4 mb-4">
          <input
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            placeholder="Header"
            className="w-[300px] h-[30px] border rounded ps-2"
            type="text"
          />
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image link"
            className="w-[300px] h-[30px] border rounded ps-2"
            type="text"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-[300px] h-[100px] border rounded ps-2"
            type="text"
          />
        </div>
        <span
          onClick={() => {
            !userLogged && navigate('/sign-in');
          }}>
          <MyPrimaryButton type="submit" className="w-[300px] py-3">
            Create Post
          </MyPrimaryButton>
        </span>
      </form>
    </div>
  );
}

export default PostCreate;
