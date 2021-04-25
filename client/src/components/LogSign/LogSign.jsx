import s from './LogSign.module.css';
import Sign from './Sign/Sign';
import Login from './Login/Login';
import spinner from '../../assets/images/spinner.gif';
import { useHistory } from "react-router-dom";


const LogSign = ({message, isFetching, registerThunk, loginThunk, logged, toggleLogged}) => {

    let history = useHistory();

    function redirectHome() {
      history.push("/");
    }

    const login = (values) => {
        redirectHome();
        loginThunk(values);
    };

    return(
        <div className={s.logsign}>
            {logged ? 
                <Login toggleLogged={toggleLogged} login={login}/> 
            :
                <Sign toggleLogged={toggleLogged} register={registerThunk}/>
            }
            {isFetching && <div className={s.spinner}>
                    <img src={spinner} alt="spinner"/>
            </div>}
            {message && <div className={s.toastWrapper}><div className={s.toast}>{message}</div></div>}
        </div>
    )
};


export default LogSign;