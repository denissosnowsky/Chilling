import s from './UserInfo.module.css';
import cs from 'classnames';
import UserInfoDetailsContainer from './UserInfoDetails/UserInfoDetailsContainer';
import logoPhoto from '../../../assets/images/user.png';
import wallpaperPhoto from '../../../assets/images/wallpaper.jpg';
import spinner from '../../../assets/images/spinner.gif';
import { url } from '../../../config';


const UserInfo = (props) => {
    
    return(
        <div className={s.user}>
            <div className={s.user__wallpaper}>
                {props.isFetchingBImage 
                    ?
                    <img className={s.user__lSpinner} src={spinner} alt="spinner"/>
                    :
                    <img className={s.user__img} src={props.user.lImg ? url+props.user.lImg : wallpaperPhoto} alt="user"/>
                }
                { props.paramId==props.me &&              
                    <>
                        <input className={s.user__inputBig} accept="image/*" type={"file"} name="lImg" id="lImg" onChange={props.selectWallpaper}/>
                        <label className={s.user__labelBig} htmlFor="lImg">Змінити фон</label>
                    </>
                }
            </div>
            <div className={s.user__userPhoto}>
                {props.isFetchingSImage
                    ?
                    <img src={spinner} alt="spinner"/>
                    :
                    <img src={props.user.sImg ? url+props.user.sImg : logoPhoto} alt="user"/>
                }
                { props.paramId==props.me &&                    
                    <>
                        <input className={s.user__inputSmall} accept="image/*" type={"file"} name="sImg" id="sImg" onChange={props.selectPhoto}/>
                        <label className={s.user__labelSmall} htmlFor="sImg">Змінити фото</label>
                    </>
                }
            </div>
            <div className={s.user__userDetails}>
                <div className={cs([s.user__name], 'border', 'border-1')}>
                    <div className={s.user__firstName}>{props.user.name}</div>
                    <div className={s.user__secondName}>{props.user.surname}</div>
                    { props.paramId!=props.me && 
                        <button onClick={()=>{props.createDialog(props.user._id)}} type="button" className='btn btn-danger myBtn'>Написати</button>
                    }
                </div>
                <UserInfoDetailsContainer me={props.me} city={props.user.city} birth={props.user.birth} education={props.user.education} book={props.user.book} phone={props.user.phone} status={props.user.status}/>            
            </div>
        </div>
    )
}


export default UserInfo;

