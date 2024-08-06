import { Route, Routes } from 'react-router';
import Options from './options-page/Options';
import Feed from './feed-page/Feed';
import User from './user-page/User';
import Unknown from './unknown-page/Unknown';
import { ContextOverAll } from '../context/context';
import Login from './auth/Login';
import Register from './auth/Register';
import PostCreate from './create-post-page/PostCreate';

function RouterApp() {
  return (
    <ContextOverAll>
      <div className="w-full h-[800px] flex justify-center items-center">
        <div className="w-[80%] h-full flex justify-start items-center">
          <Options />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/user-profile" element={<User />} />
            <Route path="/post-creation" element={<PostCreate />} />
            <Route path="*" element={<Unknown />} />
          </Routes>
        </div>
      </div>
    </ContextOverAll>
  );
}

export default RouterApp;
