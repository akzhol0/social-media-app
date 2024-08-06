import { useContext, useState } from 'react';
import { contextData } from '../../context/context';

type PostProps = {
  item: any;
  deletePost: (arg0: string) => void;
};

function Post({ item, deletePost }: PostProps) {
  const { userLoggedInfo } = useContext(contextData);
  const [modal, setModal] = useState(false);

  return (
    <div className="w-full h-[500px] flex bg-white my-2">
      <div className="max-w-[500px] min-w-[500px] h-full">
        <img
          className="w-full h-full object-contain border bg-gray-200"
          src={item.image}
          alt="post logo"
        />
      </div>
      <div className="flex flex-col ps-2">
        <div className="flex items-center">
          <div className="w-[40px] h-[40px] rounded-[50%] border border-gray-600 overflow-hidden">
            <img className="w-full h-full" src={`/img/${item.userInfo.gender}.png`} alt="pfp" />
          </div>
          <div className="flex flex-col ms-2 justify-center">
            <span>{item.date}</span>
            <span>
              {item.userInfo.name} {item.userInfo.lastName}
            </span>
          </div>
          <div
            onClick={() => setModal(modal ? false : true)}
            className="relative ms-2 text-[30px] cursor-pointer">
            ...
            {modal && (
              <div className="absolute right-0 w-[150px] flex flex-col bg-gray-200 text-[16px]">
                {userLoggedInfo.uid === item.userInfo.uid && (
                  <p
                    onClick={() => deletePost(item.id)}
                    className="hover:bg-gray-300">
                    Delete
                  </p>
                )}
                <p>...</p>
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
