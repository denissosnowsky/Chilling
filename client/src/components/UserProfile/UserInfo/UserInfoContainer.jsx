import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import UserInfo from './UserInfo';

const UserInfoContainer = (props) => {

    let paramId = props.match.params.id;

    const selectPhoto = (e) => {
        if(e.target.files.length){
            props.savePhoto(e.target.files[0]);
        }
    };

    const selectWallpaper = (e) => {
        if(e.target.files.length){
            props.saveBigPhotoThunk(e.target.files[0]);
        }
    };

    if(props.dialogId){
        if(props.isFetchingD){
            props.isFetchingDialog(false);
            return <Redirect to={`/messages/${props.dialogId}`}/>
        } 
    }

    return (
        <UserInfo selectPhoto={selectPhoto}
                selectWallpaper={selectWallpaper}
                paramId={paramId}
                {...props}
         />
    )
};

export default withRouter(UserInfoContainer); 