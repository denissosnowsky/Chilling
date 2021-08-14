import { compose } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  changePageUsers,
  changeSearchedPhrase,
  getUsersThunk,
  setPage,
} from "../../redux/usersReducer";
import { addFriendThunk, removeFriendThunk } from "../../redux/friendsReducer";
import { useEffect } from "react";
import Global from "./Global";

const GlobalContainer = ({
  getUsersThunk,
  users,
  isFetching,
  addFriendThunk,
  removeFriendThunk,
  currentPageUsers,
  totalUsersCount,
  pageSizeUsers,
  changePageUsers,
  pageSizeFriends,
  currentPageFriends,
  searchedPhrase,
  changeSearchedPhrase,
  isFetchingIsFriend,
}) => {
  useEffect(() => {
    getUsersThunk(currentPageUsers, pageSizeUsers, searchedPhrase);
  }, [currentPageUsers, pageSizeUsers, searchedPhrase]);

  useEffect(() => {
    changePageUsers(1);
    changeSearchedPhrase("");
  }, []);

  useEffect(() => {
    if (users.length === 0 && currentPageUsers > 1) {
      changePageUsers(currentPageUsers - 1);
    }
  });

  return (
    <Global
      users={users}
      isFetching={isFetching}
      addFriendThunk={addFriendThunk}
      removeFriendThunk={removeFriendThunk}
      currentPageUsers={currentPageUsers}
      totalUsersCount={totalUsersCount}
      pageSizeUsers={pageSizeUsers}
      changePageUsers={changePageUsers}
      pageSizeFriends={pageSizeFriends}
      currentPageFriends={currentPageFriends}
      searchedPhrase={searchedPhrase}
      changeSearchedPhrase={changeSearchedPhrase}
      isFetchingIsFriend={isFetchingIsFriend}
    />
  );
};

const mapStateToProps = (state) => ({
  users: state.usersPage.users,
  currentPageUsers: state.usersPage.currentPage,
  isFetching: state.usersPage.isFetching,
  totalUsersCount: state.usersPage.totalUsersCount,
  pageSizeUsers: state.usersPage.pageSize,
  currentPageFriends: state.friendsPage.currentPage,
  pageSizeFriends: state.friendsPage.pageSize,
  searchedPhrase: state.usersPage.searchedPhrase,
  isFetchingIsFriend: state.friendsPage.isFetchingIsFriend,
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getUsersThunk,
    addFriendThunk,
    removeFriendThunk,
    changePageUsers,
    changeSearchedPhrase,
  })
)(GlobalContainer);
