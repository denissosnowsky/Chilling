import s from './UserProfile.module.css';
import UserInfoContainer from './UserInfo/UserInfoContainer';
import UserPostsContainer from './UserPosts/UserPostsContainer';
import { withRouter } from 'react-router';
import { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner/Spinner';
import { fetchingToggle, getProfileThunk, saveBigPhotoThunk, savePhotoThunk } from '../../redux/profileReducer';
import { createDialog, isFetchingDialog } from '../../redux/messageReducer';
import Error from '../Error/Error';



const UserProfile = ({isFetching, user, getProfileThunk, me, myId, savePhotoThunk, saveBigPhotoThunk, createDialog, isFetchingD, dialogId, isFetchingDialog, isFetchingSImage, isFetchingBImage, fetchingToggle, ...props}) => {
    let id = props.match.params.id;
    useEffect(()=>{
        if(!id){
            id = me;
        }
        getProfileThunk(id);
    }, [id, me]);

    if(!user.order || isFetching){
        debugger;
        return <Spinner/>
    };

    if(user.order != id){
        return <Error />
    };

    return (
        <div>
            <UserInfoContainer user={user}
                     savePhoto={savePhotoThunk}
                     saveBigPhotoThunk={saveBigPhotoThunk}
                     me={me}
                     createDialog={createDialog}
                     isFetchingDialog={isFetchingDialog}
                     dialogId={dialogId}
                     isFetchingD={isFetchingD}
                     isFetchingSImage={isFetchingSImage}
                     isFetchingBImage={isFetchingBImage}
            />
            <UserPostsContainer user={user}
                    myId={myId}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isFetching: state.profilePage.isFetching,
    user: state.profilePage.user,
    me: state.authPage.order,
    myId: state.authPage.userId, 
    dialogId: state.messagesPage.dialogId,
    isFetchingD: state.messagesPage.isFetchingD,
    isFetchingSImage: state.profilePage.isFetchingSImage,
    isFetchingBImage: state.profilePage.isFetchingBImage
});

export default compose(withRouter, connect(mapStateToProps, {getProfileThunk, savePhotoThunk, saveBigPhotoThunk, createDialog, isFetchingDialog, fetchingToggle}))(UserProfile);



