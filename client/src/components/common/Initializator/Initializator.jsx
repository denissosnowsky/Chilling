import s from './Initializator.module.css';
import Spinner from '../Spinner/Spinner';


const Initializator = () => {
    return (
        <div className={s.initializator}>
            <Spinner />
        </div>
    )
};

export default Initializator;