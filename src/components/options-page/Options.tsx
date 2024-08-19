import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MyPrimaryButton from '../UI/my-button/MyPrimaryButton';
import { contextData } from '../../context/context';

function Options() {
  const location = useLocation();
  const { userLogged } = useContext(contextData);
  const [activeOption, setActiveOption] = useState<string>(location.pathname);
  const [brgr, setBrgr] = useState(false);
  const loggedOptions = [
    {
      title: 'User',
      path: '/user-profile',
    },
    {
      title: 'Feed',
      path: '/',
    },
    {
      title: 'Add Posts',
      path: '/post-creation',
    },
    {
      title: 'Bookmarks',
      path: '/bookmarks',
    },
  ];

  const notLoggedOptions = [
    {
      title: 'User',
      path: '/user-profile',
    },
    {
      title: 'Feed',
      path: '/',
    },
  ];

  return (
    <>
      <span className="block md:hidden" onClick={() => setBrgr(brgr ? false : true)}>
        <MyPrimaryButton className="absolute top-2 left-2">X</MyPrimaryButton>
      </span>
      <div
        className={`fixed md:static min-w-[250px] duration-[.3s] h-full bg-white flex flex-col ${
          brgr ? 'left-0 ' : 'left-[-250px] '
        }`}>
        {userLogged
          ? loggedOptions.map((item) => (
              <Link key={item.title} to={item.path}>
                <span
                  onClick={() => {
                    setActiveOption(item.path);
                    setBrgr(false);
                  }}
                  className={`w-full flex justify-center hover:bg-gray-300 cursor-pointer ${
                    activeOption === item.path && 'bg-gray-300'
                  }`}>
                  {item.title}
                </span>
              </Link>
            ))
          : notLoggedOptions.map((item) => (
              <Link key={item.title} to={item.path}>
                <span
                  onClick={() => {
                    setActiveOption(item.path);
                    setBrgr(false);
                  }}
                  className={`w-full flex justify-center hover:bg-gray-300 cursor-pointer ${
                    activeOption === item.path && 'bg-gray-300'
                  }`}>
                  {item.title}
                </span>
              </Link>
            ))}
      </div>
    </>
  );
}

export default Options;
