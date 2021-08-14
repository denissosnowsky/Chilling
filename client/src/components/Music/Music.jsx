import s from "./Music.module.css";
import cs from "classnames";
import AllMusicContainer from "./AllMusic/AllMusicContainer";
import MyMusicContainer from "./MyMusic/MyMusicContainer";
import { useState } from "react";

const Music = () => {
  const [allMusic, setAllMusic] = useState(true);

  return (
    <div>
      <ul className={cs([s.music__nav], "nav", "nav-pills", "nav-fill")}>
        <li
          className={cs([s.music__li], "nav-item", "border", "border-1")}
          onClick={() => {
            setAllMusic(true);
          }}
        >
          <span className={cs("nav-link", [allMusic && s.active])}>
            Вся музика
          </span>
        </li>
        <li
          className={cs([s.music__li], "nav-item", "border", "border-1")}
          onClick={() => {
            setAllMusic(false);
          }}
        >
          <span className={cs("nav-link", [!allMusic && s.active])}>
            Моя музика
          </span>
        </li>
      </ul>
      <div className={s.music__inner}>
        {allMusic ? <AllMusicContainer /> : <MyMusicContainer />}
      </div>
    </div>
  );
};

export default Music;
