import s from './Message.module.css';
import cs from 'classnames';
import userPhoto from '../../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import { url } from '../../../config';


const Message = ({dialog, lastMessage, opponent}) => {
    return(
        <NavLink to={`/messages/${dialog._id}`} style={{textDecoration: 'none'}}>
            <div className={cs([s.message], 'border', 'border-1')}>
                <div className={cs([s.message__image], 'border', 'border-1')}>
                    <img src={opponent.sImg ? url+opponent.sImg: userPhoto} alt="user"/>
                </div>
                <div className={s.message__desc}>
                    <div className={s.message__name}>{opponent.name} {opponent.surname}</div>
                    <div className={s.message__text}>{lastMessage}</div>
                </div>
            </div>
        </NavLink>
    )
}

export default Message;
