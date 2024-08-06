import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="w-full h-[50px] flex justify-center items-center bg-blue-400">
      <Link to="/">
        <p className="text-lg">Social App</p>
      </Link>
    </div>
  );
}

export default Header;
