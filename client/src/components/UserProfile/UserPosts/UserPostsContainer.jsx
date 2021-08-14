import { useInput } from "../../../Hooks/useInputHook";
import {
  addPostThunk,
  addTempDislike,
  addTempLike,
  dislikePostThunk,
  fetchingLoadBtnPost,
  getPostsThunk,
  likePostThunk,
  removePostThunk,
} from "../../../redux/postsReducer";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import UserPosts from "./UserPosts";

const UserPostsContainer = ({
  user,
  posts,
  myId,
  addPostThunk,
  getPostsThunk,
  isFetching,
  removePostThunk,
  likePostThunk,
  dislikePostThunk,
  count,
  portion,
  isFetchingPostAdd,
  isFetchingPostDelete,
  addTempLike,
  addTempDislike,
  fetchingLoadBtnPost,
  isFetchingLoadBtn,
}) => {
  useEffect(() => {
    getPostsThunk(user._id, portion, currentPage);
  }, [user]);

  const [currentPage, setCurrentPage] = useState(1);
  const [text, setText] = useInput("");
  const [img, setImg] = useInput("");
  const formRef = useRef(null);

  const loadPhoto = (event) => {
    if (event.target.files.length) {
      setImg(event.currentTarget.files[0]);
    }
  };

  const submitForm = (event) => {
    formRef.current.reset();
    event.preventDefault();
    let to = user._id;
    addPostThunk(img, text, to, portion, currentPage);
    setText("");
  };

  const pagesNumber = Math.ceil(count / portion);
  const loadFunction = () => {
    getPostsThunk(user._id, portion, currentPage + 1);
    setCurrentPage((p) => (p = p + 1));
    fetchingLoadBtnPost(true);
  };

  return (
    <UserPosts
      posts={posts}
      myId={myId}
      isFetching={isFetching}
      removePostThunk={removePostThunk}
      likePostThunk={likePostThunk}
      dislikePostThunk={dislikePostThunk}
      portion={portion}
      isFetchingPostAdd={isFetchingPostAdd}
      isFetchingPostDelete={isFetchingPostDelete}
      addTempLike={addTempLike}
      addTempDislike={addTempDislike}
      isFetchingLoadBtn={isFetchingLoadBtn}
      pagesNumber={pagesNumber}
      loadFunction={loadFunction}
      submitForm={submitForm}
      loadPhoto={loadPhoto}
      currentPage={currentPage}
      setText={setText}
      text={text}
      formRef={formRef}
    />
  );
};

const mapStateToProps = (state) => ({
  posts: state.postsPage.posts,
  isFetching: state.postsPage.isFetching,
  count: state.postsPage.count,
  portion: state.postsPage.portion,
  isFetchingPostAdd: state.postsPage.isFetchingPostAdd,
  isFetchingPostDelete: state.postsPage.isFetchingPostDelete,
  isFetchingLoadBtn: state.postsPage.isFetchingLoadBtn,
});

export default connect(mapStateToProps, {
  addPostThunk,
  getPostsThunk,
  removePostThunk,
  likePostThunk,
  dislikePostThunk,
  addTempLike,
  addTempDislike,
  fetchingLoadBtnPost,
})(UserPostsContainer);
