import s from './News.module.css';
import Post from '../common/Post/Post';
import Spinner from '../common/Spinner/Spinner';
import cs from 'classnames';
import spinner from '../../assets/images/spinner.gif';

const News = ({isFetching, news, myId, removeNewThunk, likeNewThunk, dislikeNewThunk, portion, isFetchingNewDelete, addTempLikeNew, addTempDislikeNew, isFetchingLoadBtn, currentPage, pagesNumber, loadFunction}) => {

    return(
        <div>
            {isFetching
                ?
                    <div className={s.spinnerWrapper}>
                        <Spinner />
                    </div>
                :
                    news.length > 0
                ?
                    news.map((theNew)=><Post key={theNew._id}
                                            post={theNew} 
                                            myId={myId}
                                            removePost={removeNewThunk}
                                            likePost={likeNewThunk}
                                            dislikePost={dislikeNewThunk}
                                            pageFrom={"news"}
                                            portion={portion}
                                            currentPage={currentPage}
                                            isFetchingPostDelete={isFetchingNewDelete}
                                            addTempLike={addTempLikeNew}
                                            addTempDislike={addTempDislikeNew}
                    />)
                :
                    <div className={s.news__noNews}>Поки немає новин</div>
            }
            {currentPage<pagesNumber && 
                <button  onClick={loadFunction} className={cs([s.news__loadMore], 'btn', 'btn-danger', 'myBtn')}>
                    {isFetchingLoadBtn 
                        ? 
                        <img className={s.new__spinnerBtn} src={spinner} alt="spinner"/> 
                        : 
                        'Загрузити ще'
                    }
                </button>}    
        </div>
    )
}


export default News;



