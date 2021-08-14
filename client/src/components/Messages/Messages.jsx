import s from "./Messages.module.css";
import cs from "classnames";
import MessageContainer from "./Message/MessageContainer";
import Spinner from "../common/Spinner/Spinner";
import spinner from "../../assets/images/spinner.gif";

const Messages = ({
  isFetchingMenu,
  myId,
  menuMessage,
  currentPage,
  pagesNumber,
  loadFunction,
  isFetchingLoadMenu,
}) => {
  if (isFetchingMenu) {
    return <Spinner />;
  }

  return (
    <div>
      {menuMessage.length > 0 ? (
        menuMessage.map((item) => (
          <MessageContainer key={item._id} dialog={item} myId={myId} />
        ))
      ) : (
        <div className={s.messages__noMessages}>
          У Вас поки немає повідомлень
        </div>
      )}
      {currentPage < pagesNumber && (
        <button
          onClick={loadFunction}
          className={cs([s.messages__loadMore], "btn", "btn-danger", "myBtn")}
        >
          {isFetchingLoadMenu ? (
            <img
              className={s.messages__spinnerBtn}
              src={spinner}
              alt="spinner"
            />
          ) : (
            "Запостити"
          )}
        </button>
      )}
    </div>
  );
};

export default Messages;
