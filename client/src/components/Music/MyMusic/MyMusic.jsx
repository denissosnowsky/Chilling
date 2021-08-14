import SearchBar from "../../common/SearchBar/SearchBar";
import Song from "../../common/Song/Song";
import Spinner from "../../common/Spinner/Spinner";
import s from "./MyMusic.module.css";
import cs from "classnames";
import spinner from "../../../assets/images/spinner.gif";

const MyMusic = ({
  isFetchingMy,
  myMusic,
  deleteMusic,
  searchedPhraseMy,
  changeSearchedPhraseMusicMy,
  myMusicCount,
  portion,
  isFetchingAddSong,
  isFetchingLoadBtnMy,
  isFetchingSearch,
  fetchingSearchMusic,
  pagesNumber,
  loadFunction,
  currentPage,
}) => {
  if (isFetchingMy) {
    return (
      <div className={s.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <SearchBar
        searchedPhrase={searchedPhraseMy}
        changeSearchedPhrase={changeSearchedPhraseMusicMy}
        isFetchingSearch={isFetchingSearch}
        fetchingSearchMusic={fetchingSearchMusic}
      />
      <div className={s.music__songWrapper}>
        {myMusic.length > 0 ? (
          myMusic.map((song) => (
            <Song
              key={song._id}
              music={song}
              deleteMusic={deleteMusic}
              portion={portion}
              currentPage={currentPage}
              searchedPhrase={searchedPhraseMy}
              isFetchingAddSong={isFetchingAddSong}
            />
          ))
        ) : myMusicCount <= 0 ? (
          <div className={s.noMusic}>У Вас поки немає добавлених пісень</div>
        ) : null}
      </div>
      {currentPage < pagesNumber && (
        <button
          onClick={loadFunction}
          className={cs([s.music__loadMore], "btn", "btn-danger", "myBtn")}
        >
          {isFetchingLoadBtnMy ? (
            <img className={s.music__spinnerBtn} src={spinner} alt="spinner" />
          ) : (
            "Загрузити ще"
          )}
        </button>
      )}
    </div>
  );
};

export default MyMusic;
