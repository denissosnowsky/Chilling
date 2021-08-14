import s from "./Person.module.css";
import cs from "classnames";
import userPhoto from "../../../assets/images/user.png";
import { NavLink, withRouter } from "react-router-dom";
import spinner from "../../../assets/images/spinner.gif";

const Person = ({
  user,
  isFriend,
  isMe,
  removeFriend,
  addFriend,
  pageSizeUsers,
  currentPageUsers,
  pageSizeFriends,
  currentPageFriends,
  isFetchingIsFriend,
  searchedPhrase,
}) => {
  return (
    <div className={cs([s.person], "border", "boreder-1")}>
      <div className={s.person__logo}>
        <NavLink to={`/profile/${user.order}`}>
          <img src={user.sImg || userPhoto} alt="user" />
        </NavLink>
      </div>
      <div className={s.person__desc}>
        <NavLink to={`/profile/${user.order}`} className={s.person__name}>
          {user.name + " " + user.surname}
        </NavLink>
        <div className={s.person__city}>{user.city}</div>
        {isMe ? (
          <div
            className={cs([s.person__myPage], "btn", "btn-secondary", "myBtn")}
          >
            Це Ваша сторінка
          </div>
        ) : isFriend ? (
          <button
            type="button"
            className="btn btn-danger myBtn"
            onClick={() => {
              removeFriend(
                user._id,
                currentPageUsers,
                pageSizeUsers,
                currentPageFriends,
                pageSizeFriends,
                searchedPhrase
              );
            }}
          >
            {isFetchingIsFriend.some((id) => id == user._id) ? (
              <img
                src={spinner}
                alt="spinner"
                className={s.person__spinnerBtn}
              />
            ) : (
              "Видалити з друзів"
            )}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-danger myBtn"
            onClick={() => {
              addFriend(
                user._id,
                currentPageUsers,
                pageSizeUsers,
                currentPageFriends,
                pageSizeFriends,
                searchedPhrase
              );
            }}
          >
            {isFetchingIsFriend.some((id) => id == user._id) ? (
              <img
                src={spinner}
                alt="spinner"
                className={s.person__spinnerBtn}
              />
            ) : (
              "Добавити в друзі"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default withRouter(Person);
