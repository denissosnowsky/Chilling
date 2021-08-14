import spinner from "../../../assets/images/spinner.gif";
import s from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={s.spinner}>
      <img src={spinner} alt="spinner" />
    </div>
  );
};

export default Spinner;
