import s from './Post.module.css';
import cs from 'classnames';
import logoPhoto from '../../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import spinner from '../../../assets/images/spinner.gif';
import { url } from '../../../config';

const Post = ({post, myId, removePost, likePost, dislikePost, pageFrom, currentPage, portion, isFetchingPostDelete, addTempLike, addTempDislike}) => {
    
    const isLiked = (post.liked.indexOf(myId)!=-1);
    const likeToggle = (id, me, to, portion, currentPage) => {
        if(!isLiked){
            addTempLike(id, me);
            likePost(id, me, to, portion, currentPage);
        }else{
            addTempDislike(id, me);
            dislikePost(id, me, to, portion, currentPage);
        }
    };

    return(
        <div>
            <div className={cs([s.posts__post], 'border', 'border-1')}>
                <div onDoubleClick={()=>{likeToggle(post._id, myId, post.to._id, portion, currentPage)}} className={s.posts__like}>
                    <i className={cs([isLiked && s.posts_liked], "bi", "bi-heart-fill")}>
                        <span className="pe-1 ps-1" >{post.liked.length}</span>
                    Likes</i>
                </div>
                {post.from._id == myId || post.to._id == myId
                    ?
                    isFetchingPostDelete.some(id=>id==post._id) 
                        ? 
                        <img src={spinner} alt='spinner' className={cs([s.posts__delete, s.posts__spinnerImg])}/> 
                        : 
                        <div onClick={()=>{removePost(post._id, post.to._id, portion, currentPage)}} className={s.posts__delete}>
                            <i className="bi bi-x-circle-fill"></i>
                        </div>
                    :
                    null
                }
                <NavLink to={`/profile/${post.from.order}`} className={s.posts__userLogo}>
                    <img src={post.from.sImg ? url+post.from.sImg : logoPhoto} alt="logo"/>
                </NavLink>
                {pageFrom === "news"
                    ?
                    <NavLink to={`/profile/${post.to.order}`} className={s.posts__receiverLogo}>
                        <img src={post.to.sImg ? url+post.to.sImg : logoPhoto} alt="logo"/>
                    </NavLink>
                    :
                    null
                }
                {post.img
                    ?
                    <div className={s.posts__image}>
                        <img src={url+post.img} alt="post"/>
                    </div>
                    :
                    null
                }
                <div className={s.posts__text}>
                    {post.text}
                </div>
            </div>
        </div>
    )
}

export default Post;