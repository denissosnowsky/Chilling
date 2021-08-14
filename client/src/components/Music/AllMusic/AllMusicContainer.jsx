import { connect } from "react-redux";
import {
  addMusic,
  getAllMusicThunk,
  deleteMusic,
  changeSearchedPhraseMusicAll,
  fetchingLoadBtnAll,
  fetchingSearchMusic,
} from "../../../redux/musicReducer";
import { useEffect, useState } from "react";
import AllMusic from "./AllMusic";

const AllMusicContainer = ({
  allMusic,
  isFetchingAll,
  getAllMusicThunk,
  addMusic,
  deleteMusic,
  searchedPhraseAll,
  changeSearchedPhraseMusicAll,
  portion,
  allCount,
  isFetchingAddSong,
  fetchingLoadBtnAll,
  isFetchingLoadBtnAll,
  isFetchingSearch,
  fetchingSearchMusic,
}) => {
  useEffect(() => {
    getAllMusicThunk(searchedPhraseAll, portion, 1);
    setCurrentPage(1);
  }, [searchedPhraseAll]);

  useEffect(() => {
    changeSearchedPhraseMusicAll("");
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const pagesNumber = Math.ceil(allCount / portion);
  const loadFunction = () => {
    getAllMusicThunk(searchedPhraseAll, portion, currentPage + 1);
    setCurrentPage((p) => (p = p + 1));
    fetchingLoadBtnAll(true);
  };

  return (
    <AllMusic
      allMusic={allMusic}
      isFetchingAll={isFetchingAll}
      addMusic={addMusic}
      deleteMusic={deleteMusic}
      searchedPhraseAll={searchedPhraseAll}
      changeSearchedPhraseMusicAll={changeSearchedPhraseMusicAll}
      portion={portion}
      isFetchingAddSong={isFetchingAddSong}
      isFetchingLoadBtnAll={isFetchingLoadBtnAll}
      isFetchingSearch={isFetchingSearch}
      fetchingSearchMusic={fetchingSearchMusic}
      currentPage={currentPage}
      pagesNumber={pagesNumber}
      loadFunction={loadFunction}
    />
  );
};

const mapStateToProps = (state) => ({
  allMusic: state.musicPage.allMusic,
  isFetchingAll: state.musicPage.isFetchingAll,
  searchedPhraseAll: state.musicPage.searchedPhraseAll,
  portion: state.musicPage.portion,
  allCount: state.musicPage.allCount,
  isFetchingAddSong: state.musicPage.isFetchingAddSong,
  isFetchingLoadBtnAll: state.musicPage.isFetchingLoadBtnAll,
  isFetchingSearch: state.musicPage.isFetchingSearch,
});

export default connect(mapStateToProps, {
  getAllMusicThunk,
  addMusic,
  deleteMusic,
  changeSearchedPhraseMusicAll,
  fetchingLoadBtnAll,
  fetchingSearchMusic,
})(AllMusicContainer);
