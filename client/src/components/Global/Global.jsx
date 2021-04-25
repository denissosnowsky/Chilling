import s from './Global.module.css';
import SearchBar from '../common/SearchBar/SearchBar';
import Person from '../common/Person/Person';
import Spinner from '../common/Spinner/Spinner';
import Pagination from '../common/Pagination/Pagination';


const Global = ({users, isFetching, addFriendThunk, removeFriendThunk, currentPageUsers, totalUsersCount, pageSizeUsers, changePageUsers, pageSizeFriends, currentPageFriends, searchedPhrase, changeSearchedPhrase, isFetchingIsFriend}) => {

    return(
        <div>
            <SearchBar 
                changeSearchedPhrase={changeSearchedPhrase}
                searchedPhrase={searchedPhrase}
            />
            {isFetching 
                ?
                <div className={s.spinnerWrapper}>
                    <Spinner />
                </div>
                :
                users.map((user)=><Person key={user.user.id} 
                    user={user.user} 
                    isFriend={user.isFriend} 
                    isMe={user.isMe}
                    addFriend={addFriendThunk}
                    removeFriend={removeFriendThunk}
                    currentPageUsers={currentPageUsers}
                    pageSizeUsers={pageSizeUsers}
                    pageSizeFriends={pageSizeFriends}
                    currentPageFriends={currentPageFriends}
                    isFetchingIsFriend={isFetchingIsFriend}
                    searchedPhrase={searchedPhrase}
                />) 
            }
            <Pagination
                currentPage={currentPageUsers}
                totalItemsCount={totalUsersCount}
                pageSize={pageSizeUsers}
                changePage={changePageUsers} 
            />
        </div>
    )
}


export default Global;
