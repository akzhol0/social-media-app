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
    <div className="w-full min-h-[500px] flex flex-col xl:flex-row bg-white my-2 items-center xl:items-start">
      <div className="flex max-w-[350px] min-w-[350px] h-[400px] md:max-w-[500px] md:min-w-[500px] md:h-[500px]">
        <img
          className="w-full h-full object-cover border bg-gray-200"
          src={item.image}
          alt="post logo"
        />
      </div>
      <div className="flex flex-col ps-2">
        <div className="flex items-center">
          <div className="max-w-[40px] max-h-[40px] rounded-[50%] border border-gray-600 overflow-hidden">
            <img className="w-full h-full" src={`/img/${item.userInfo.gender}.png`} alt="pfp" />
          </div>
          <div className="w-full md:w-[400px] flex flex-col ms-2 justify-center">
            <div className="w-[200px] h-[22px] overflow-hidden">{item.date}</div>
            <span>
              {item.userInfo.name} {item.userInfo.lastName}
            </span>
          </div>
          <div
            onClick={() => setModal(modal ? false : true)}
            className="relative ms-2 text-[30px] cursor-pointer mb-4 me-2">
            ...
            {modal && (
              <div className="absolute right-0 w-[150px] flex flex-col bg-gray-200 text-[16px]">
                {userLoggedInfo.uid === item.userInfo.uid && (
                  <p onClick={() => deletePost(item.id)} className="hover:bg-gray-300">
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
