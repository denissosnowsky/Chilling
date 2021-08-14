import s from "./Friends.module.css";
import SearchBar from "../common/SearchBar/SearchBar";
import Person from "../common/Person/Person";
import Spinner from "../common/Spinner/Spinner";
import Pagination from "../common/Pagination/Pagination";

const Friends = ({
  isFetching,
  friends,
  removeFriendThunk,
  currentPageUsers,
  currentPageFriends,
  totalFriendsCount,
  pageSizeUsers,
  pageSizeFriends,
  changePageFriends,
  searchedPhrase,
  changeSearchedPhraseFr,
  allFriends,
  isFetchingIsFriend,
}) => {
  return (
    <div>
      <SearchBar
        changeSearchedPhrase={changeSearchedPhraseFr}
        searchedPhrase={searchedPhrase}
      />
      {isFetching ? (
        <div className={s.spinnerWrapper}>
          <Spinner />
        </div>
      ) : allFriends <= 0 ? (
        <div className={s.noFriends}>У Вас поки немає друзів</div>
      ) : (
        friends.map((friend) => (
          <Person
            key={friend.friend_id}
            user={friend.friend}
            isFriend={friend.isFriend}
            removeFriend={removeFriendThunk}
            currentPageUsers={currentPageUsers}
            pageSizeUsers={pageSizeUsers}
            pageSizeFriends={pageSizeFriends}
            currentPageFriends={currentPageFriends}
            isFetchingIsFriend={isFetchingIsFriend}
            searchedPhrase={searchedPhrase}
          />
        ))
      )}
      <Pagination
        currentPage={currentPageFriends}
        totalItemsCount={totalFriendsCount}
        pageSize={pageSizeFriends}
        changePage={changePageFriends}
      />
    </div>
  );
};

export default Friends;
