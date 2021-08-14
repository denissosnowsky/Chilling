import { connect } from "react-redux";
import {
  changeSearchedPhraseMusicMy,
  deleteMusic,
  fetchingLoadBtnMy,
  fetchingSearchMusic,
  getMyMusicThunk,
} from "../../../redux/musicReducer";
import MyMusic from "./MyMusic";
import { useEffect, useState } from "react";

const MyMusicContainer = ({
  isFetchingMy,
  myMusic,
  getMyMusicThunk,
  deleteMusic,
  searchedPhraseMy,
  changeSearchedPhraseMusicMy,
  myMusicCount,
  portion,
  myCount,
  isFetchingAddSong,
  isFetchingLoadBtnMy,
  fetchingLoadBtnMy,
  isFetchingSearch,
  fetchingSearchMusic,
}) => {
  useEffect(() => {
    getMyMusicThunk(searchedPhraseMy, portion, 1);
    setCurrentPage(1);
  }, [searchedPhraseMy]);

  useEffect(() => {
    changeSearchedPhraseMusicMy("");
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const pagesNumber = Math.ceil(myCount / portion);
  const loadFunction = () => {
    getMyMusicThunk(searchedPhraseMy, portion, currentPage + 1);
    setCurrentPage((p) => (p = p + 1));
    fetchingLoadBtnMy(true);
  };

  return (
    <MyMusic
      isFetchingMy={isFetchingMy}
      myMusic={myMusic}
      deleteMusic={deleteMusic}
      searchedPhraseMy={searchedPhraseMy}
      changeSearchedPhraseMusicMy={changeSearchedPhraseMusicMy}
      myMusicCount={myMusicCount}
      portion={portion}
      isFetchingAddSong={isFetchingAddSong}
      isFetchingLoadBtnMy={isFetchingLoadBtnMy}
      isFetchingSearch={isFetchingSearch}
      fetchingSearchMusic={fetchingSearchMusic}
      pagesNumber={pagesNumber}
      loadFunction={loadFunction}
      currentPage={currentPage}
    />
  );
};

const mapStateToProps = (state) => ({
  myMusic: state.musicPage.myMusic,
  isFetchingMy: state.musicPage.isFetchingMy,
  searchedPhraseMy: state.musicPage.searchedPhraseMy,
  myMusicCount: state.musicPage.myMusicCount,
  portion: state.musicPage.portion,
  myCount: state.musicPage.myCount,
  isFetchingAddSong: state.musicPage.isFetchingAddSong,
  isFetchingLoadBtnMy: state.musicPage.isFetchingLoadBtnMy,
  isFetchingSearch: state.musicPage.isFetchingSearch,
});

export default connect(mapStateToProps, {
  getMyMusicThunk,
  deleteMusic,
  changeSearchedPhraseMusicMy,
  fetchingLoadBtnMy,
  fetchingSearchMusic,
})(MyMusicContainer);
