import Song from "../../common/Song/Song";
import s from "./AllMusic.module.css";
import SearchBar from "../../common/SearchBar/SearchBar.jsx";
import Spinner from "../../common/Spinner/Spinner";
import cs from "classnames";
import spinner from "../../../assets/images/spinner.gif";

const AllMusic = ({
  allMusic,
  isFetchingAll,
  addMusic,
  deleteMusic,
  searchedPhraseAll,
  changeSearchedPhraseMusicAll,
  portion,
  isFetchingAddSong,
  isFetchingLoadBtnAll,
  isFetchingSearch,
  fetchingSearchMusic,
  currentPage,
  pagesNumber,
  loadFunction,
}) => {
  if (isFetchingAll) {
    return (
      <div className={s.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <SearchBar
        searchedPhrase={searchedPhraseAll}
        changeSearchedPhrase={changeSearchedPhraseMusicAll}
        isFetchingSearch={isFetchingSearch}
        fetchingSearchMusic={fetchingSearchMusic}
      />
      <div className={s.music__songWrapper}>
        {allMusic.map((song) => (
          <Song
            key={song._id}
            music={song}
            addMusic={addMusic}
            deleteMusic={deleteMusic}
            portion={portion}
            currentPage={currentPage}
            searchedPhrase={searchedPhraseAll}
            isFetchingAddSong={isFetchingAddSong}
          />
        ))}
      </div>
      {currentPage < pagesNumber && (
        <button
          onClick={loadFunction}
          className={cs([s.music__loadMore], "btn", "btn-danger", "myBtn")}
        >
          {isFetchingLoadBtnAll ? (
            <img className={s.music__spinnerBtn} src={spinner} alt="spinner" />
          ) : (
            "Загрузити ще"
          )}
        </button>
      )}
    </div>
  );
};

export default AllMusic;
