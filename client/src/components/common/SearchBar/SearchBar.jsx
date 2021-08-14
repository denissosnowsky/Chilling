import s from "./SearchBar.module.css";
import cs from "classnames";
import spinner from "../../../assets/images/spinner.gif";

const SearchBar = ({
  changeSearchedPhrase,
  searchedPhrase,
  isFetchingSearch,
  fetchingSearchMusic,
}) => {
  const changeInput = (e) => {
    changeSearchedPhrase(e.target.value);
    if (fetchingSearchMusic) {
      fetchingSearchMusic(true);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <form className={cs([s.bar__from], "container-fluid")}>
          <div className={cs([s.bar__search], "input-group")}>
            <span className="input-group-text" id="basic-addon1">
              Знайти:
            </span>
            <input
              className="border border-1"
              type="text"
              placeholder="Введіть ім'я"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={changeInput}
              value={searchedPhrase}
              autoFocus={true}
            />
          </div>
          {isFetchingSearch && (
            <img className={s.bar__spinner} src={spinner} alt="spinner"></img>
          )}
        </form>
      </nav>
    </div>
  );
};

export default SearchBar;
