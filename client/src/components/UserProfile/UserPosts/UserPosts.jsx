import s from "./UserPosts.module.css";
import cs from "classnames";
import Post from "../../common/Post/Post";
import Spinner from "../../common/Spinner/Spinner";
import spinner from "../../../assets/images/spinner.gif";

const UserPosts = ({
  posts,
  myId,
  isFetching,
  removePostThunk,
  likePostThunk,
  dislikePostThunk,
  portion,
  isFetchingPostAdd,
  isFetchingPostDelete,
  addTempLike,
  addTempDislike,
  isFetchingLoadBtn,
  pagesNumber,
  loadFunction,
  submitForm,
  loadPhoto,
  currentPage,
  setText,
  text,
  formRef,
}) => {
  return (
    <div className={cs([s.posts])}>
      <div className={s.posts__wrapper}>
        <div className={s.posts__header}>Мої пости</div>
      </div>
      <form ref={formRef} className={s.posts__textareaWrap} action="#">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className={cs([s.post__textarea], "border", "border-1")}
          placeholder="Напишіть що нового..."
        />
        <div className={s.posts__grid}>
          <button
            onClick={submitForm}
            type="submit"
            className="btn btn-danger myBtn"
          >
            {isFetchingPostAdd ? (
              <img className={s.post__spinnerBtn} src={spinner} alt="spinner" />
            ) : (
              "Запостити"
            )}
          </button>
          <div className={s.posts__file}>
            <input
              accept="image/*"
              type="file"
              className={s.post__postBtn}
              id="file"
              onChange={loadPhoto}
            />
            <label htmlFor="file" className={"border"}>
              <i className="bi bi-arrow-bar-up pe-1 ps-1"></i>Зображення
            </label>
          </div>
        </div>
      </form>
      {isFetching ? (
        <Spinner />
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            myId={myId}
            removePost={removePostThunk}
            likePost={likePostThunk}
            dislikePost={dislikePostThunk}
            pageFrom={"profile"}
            currentPage={currentPage}
            portion={portion}
            isFetchingPostDelete={isFetchingPostDelete}
            addTempLike={addTempLike}
            addTempDislike={addTempDislike}
          />
        ))
      ) : (
        <div className={s.noPosts}>Тут поки немає постів</div>
      )}
      {currentPage < pagesNumber && (
        <button
          onClick={loadFunction}
          className={cs([s.posts__loadMore], "btn", "btn-danger", "myBtn")}
        >
          {isFetchingLoadBtn ? (
            <img className={s.post__spinnerBtn} src={spinner} alt="spinner" />
          ) : (
            "Загрузити ще"
          )}
        </button>
      )}
    </div>
  );
};

export default UserPosts;
