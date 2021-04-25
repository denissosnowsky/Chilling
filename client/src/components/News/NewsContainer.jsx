import { connect } from 'react-redux';
import { addTempDislikeNew, addTempLikeNew, fetchingLoadBtnNew, getNewsThunk, removeNewThunk, likeNewThunk, dislikeNewThunk } from '../../redux/newsReducer';
import News from './News';
import { useEffect, useState } from 'react';


const NewsContainer = ({isFetching, news, getNewsThunk, myId, removeNewThunk, likeNewThunk, dislikeNewThunk, count, portion, isFetchingNewDelete, addTempLikeNew, addTempDislikeNew, fetchingLoadBtnNew, isFetchingLoadBtn}) => {

    useEffect(()=>{
        getNewsThunk(portion, currentPage);  
    }, []);

    const [currentPage, setCurrentPage] = useState(1);

    const pagesNumber = Math.ceil(count/portion);

    const loadFunction = () => {
        getNewsThunk(portion, currentPage+1);
        setCurrentPage((p)=>p=p+1);
        fetchingLoadBtnNew(true);
    };

    return(
        <News isFetching={isFetching}
            news={news}
            myId={myId}
            removeNewThunk={removeNewThunk}
            likeNewThunk={likeNewThunk}
            dislikeNewThunk={dislikeNewThunk}
            portion={portion}
            isFetchingNewDelete={isFetchingNewDelete}
            addTempLikeNew={addTempLikeNew}
            addTempDislikeNew={addTempDislikeNew}
            isFetchingLoadBtn={isFetchingLoadBtn}
            currentPage={currentPage}
            pagesNumber={pagesNumber}
            loadFunction={loadFunction}
        />
    )
};

const mapStateToProps = (state) => ({
    isFetching: state.newsPage.isFetching,
    news: state.newsPage.news,
    myId: state.authPage.userId,
    count: state.newsPage.count,
    portion: state.newsPage.portion,
    isFetchingNewDelete: state.newsPage.isFetchingNewDelete,
    isFetchingLoadBtn: state.newsPage.isFetchingLoadBtn
});

export default connect(mapStateToProps, {getNewsThunk, removeNewThunk, likeNewThunk, dislikeNewThunk, addTempLikeNew, addTempDislikeNew, fetchingLoadBtnNew})(NewsContainer);

