import { Route, Routes } from "react-router";
import Options from "./options-page/Options";
import Feed from "./feed-page/Feed";
import User from "./user-page/User";
import Unknown from "./unknown-page/Unknown";

function RouterApp() {
  return (
    <div className="w-full h-[800px] flex justify-center items-center">
      <div className="w-[80%] h-full flex justify-start items-center">
        <Options />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/user-profile" element={<User />} />
          <Route path="*" element={<Unknown />} />
        </Routes>
      </div>
    </div>
  );
}

export default RouterApp;
