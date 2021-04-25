import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
import cs from 'classnames';


const Navbar = () => {
    return (
        <nav className={cs([s.navbar], 'border', 'border-1')}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.active}><i className="bi bi-person pe-2"></i>Моя сторінка</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/friends" activeClassName={s.active}><i className="bi bi-people pe-2"></i>Друзі</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/messages" activeClassName={s.active}><i className="bi bi-envelope pe-2"></i>Повідомлення</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/news" activeClassName={s.active}><i className="bi bi-clipboard pe-2"></i>Новини</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/music" activeClassName={s.active}><i className="bi bi-speaker pe-2"></i>Музика</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/global" activeClassName={s.active}><i className="bi bi-globe2 pe-2"></i>Глобальний пошук</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;