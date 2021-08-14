import s from "./Header.module.css";
import cs from "classnames";
import logoPhoto from "../../assets/images/logo.png";
import userPhoto from "../../assets/images/user.png";
import { url } from "../../config";

const Header = ({ logoutAuth, sImg }) => {
  return (
    <div className={s.header} id="header">
      <header className={cs([s.header__wrapper], "border", "border-1")}>
        <a href="/" className={cs("text-dark", [s.header__logo])}>
          <img src={logoPhoto} alt="logo" />
        </a>
        <div className={s.header__text}>Chilling</div>
        <div className={cs("dropdown text-end", [s.header__user])}>
          <a
            href="#"
            className="d-block link-dark dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={sImg ? url + sImg : userPhoto}
              alt="mdo"
              width="32"
              height="32"
              className="rounded-circle"
              alt="user"
            />
          </a>
          <ul
            className="dropdown-menu text-small"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className={s.header__btn} href="#" onClick={logoutAuth}>
                Вийти
              </a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
