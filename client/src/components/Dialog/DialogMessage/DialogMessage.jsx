import s from "./DialogMessage.module.css";
import cs from "classnames";
import { url } from "../../../config";

const DialogMessage = ({ message, isTempMessage, isMyMessage, data }) => {
  return (
    <div className={cs([s.dialog__message, isMyMessage ? s.me : s.opponent])}>
      <div className={s.dialog__wrapper}>
        {message.img && (
          <div className={cs([s.dialog__image], "border", "border-1")}>
            <img alt="msg" src={url + message.img} />
          </div>
        )}
        {message.text && (
          <div className={cs([s.dialog__text], "border", "border-1")}>
            {message.text}
          </div>
        )}
        <div className={cs([s.dialog__data])}>{data}</div>
        {isMyMessage && (
          <div className={s.dialog__isLoaded}>
            {isTempMessage ? (
              <i className="bi bi-dot"></i>
            ) : (
              <i className="bi bi-check check" style={{ color: "#00d15b" }}></i>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogMessage;
