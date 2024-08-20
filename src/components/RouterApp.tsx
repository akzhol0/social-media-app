import { Route, Routes } from 'react-router';
import Options from './options-page/Options';
import Feed from './feed-page/Feed';
import User from './user-page/User';
import Unknown from './unknown-page/Unknown';
import { ContextOverAll } from '../context/context';
import Login from './auth/Login';
import Register from './auth/Register';
import PostCreate from './create-post-page/PostCreate';
import Bookmarks from './bookmark/Bookmarks';
import UserForeign from './user-page/UserForeign';
import EditProfile from './edit-profile/EditProfile';

function RouterApp() {
  return (
    <ContextOverAll>
      <div className="w-full flex flex-col h-screen justify-center items-center">
        <div className="w-full xl:w-[80%] h-full justify-center flex items-center">
          <Options />
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<Register />} />
              <Route path="/user-profile" element={<User />} />
              <Route path="/post-creation" element={<PostCreate />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/user/:uid" element={<UserForeign />} />
              <Route path="/user-profile/edit-profile" element={<EditProfile />} />
              <Route path="*" element={<Unknown />} />
            </Routes>
        </div>
      </div>
    </ContextOverAll>
  );
}

export default RouterApp;
