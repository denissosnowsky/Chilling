import s from "./Error.module.css";

const Error = () => {
  return (
    <div className={s.error}>
      <div className={s.error__word}>Error 404</div>
    </div>
  );
};

export default Error;
