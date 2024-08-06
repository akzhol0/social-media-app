import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Options() {
  const location = useLocation();
  const [activeOption, setActiveOption] = useState<string>(location.pathname);
  const options = [
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
  ];

  return (
    <div className="w-[250px] h-full bg-white flex flex-col">
      {options.map((item) => (
        <Link key={item.title} to={item.path}>
          <span
            onClick={() => setActiveOption(item.path)}
            className={`w-full flex justify-center hover:bg-gray-300 cursor-pointer ${
              activeOption === item.path && 'bg-gray-300'
            }`}>
            {item.title}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default Options;
