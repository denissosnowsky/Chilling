import { useEffect } from 'react';
import { connect } from 'react-redux';
import { changePageFriends, changeSearchedPhraseFr, getFriendsThunk, removeFriendThunk } from '../../redux/friendsReducer';
import Friends from './Friends';


const FriendsContainer = ({getFriendsThunk, isFetching, friends, removeFriendThunk, currentPageUsers, currentPageFriends, totalFriendsCount, pageSizeUsers, pageSizeFriends, changePageFriends, searchedPhrase, changeSearchedPhraseFr, allFriends, isFetchingIsFriend}) => {

    useEffect(()=>{
        getFriendsThunk(currentPageFriends, pageSizeFriends, searchedPhrase);
    }, [currentPageFriends, pageSizeFriends, searchedPhrase]);

    useEffect(()=>{
        changePageFriends(1);
        changeSearchedPhraseFr('');
    }, []);

    useEffect(()=>{
        if(friends.length===0 && currentPageFriends>1){
            changePageFriends(currentPageFriends-1);    
        }
    });

    return(
        <Friends isFetching={isFetching}
                friends={friends}
                removeFriendThunk={removeFriendThunk}
                currentPageUsers={currentPageUsers}
                currentPageFriends={currentPageFriends}
                totalFriendsCount={totalFriendsCount}
                pageSizeUsers={pageSizeUsers}
                pageSizeFriends={pageSizeFriends}
                changePageFriends={changePageFriends}
                searchedPhrase={searchedPhrase}
                changeSearchedPhraseFr={changeSearchedPhraseFr}
                allFriends={allFriends}
                isFetchingIsFriend={isFetchingIsFriend}
        />
    )
};

const mapStateToProps = (state) => ({
    isFetching: state.friendsPage.isFetching,
    friends: state.friendsPage.friends,
    totalFriendsCount: state.friendsPage.totalFriendsCount,
    currentPageFriends: state.friendsPage.currentPage,
    pageSizeFriends: state.friendsPage.pageSize,
    pageSizeUsers: state.usersPage.pageSize,
    currentPageUsers: state.usersPage.currentPage,
    searchedPhrase: state.friendsPage.searchedPhrase,
    allFriends: state.friendsPage.allFriends,
    isFetchingIsFriend: state.friendsPage.isFetchingIsFriend
});

export default connect(mapStateToProps, {getFriendsThunk, removeFriendThunk, changePageFriends, changeSearchedPhraseFr})(FriendsContainer);