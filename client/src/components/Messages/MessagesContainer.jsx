import { connect } from "react-redux";
import {
  fetchingLoadMenu,
  getMessagesMenuThunk,
  getMessagesMenuThunkUpdate,
} from "../../redux/messageReducer";
import Messages from "./Messages";
import { useEffect, useState } from "react";

const MessagesContainer = ({
  isFetchingMenu,
  myId,
  menuMessage,
  getMessagesMenuThunk,
  menuCount,
  portion,
  isFetchingLoadMenu,
  fetchingLoadMenu,
  getMessagesMenuThunkUpdate,
}) => {
  useEffect(() => {
    getMessagesMenuThunk(portion, currentPage);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const pagesNumber = Math.ceil(menuCount / portion);
  const loadFunction = () => {
    getMessagesMenuThunkUpdate(portion, currentPage + 1);
    setCurrentPage((p) => (p = p + 1));
    fetchingLoadMenu(true);
  };

  return (
    <Messages
      isFetchingMenu={isFetchingMenu}
      myId={myId}
      menuMessage={menuMessage}
      currentPage={currentPage}
      pagesNumber={pagesNumber}
      loadFunction={loadFunction}
      isFetchingLoadMenu={isFetchingLoadMenu}
    />
  );
};

const mapStateToProps = (state) => ({
  menuMessage: state.messagesPage.menuMessage,
  isFetchingMenu: state.messagesPage.isFetchingMenu,
  myId: state.authPage.userId,
  menuCount: state.messagesPage.menuCount,
  portion: state.messagesPage.portion,
  isFetchingLoadMenu: state.messagesPage.isFetchingLoadMenu,
});

export default connect(mapStateToProps, {
  getMessagesMenuThunk,
  fetchingLoadMenu,
  getMessagesMenuThunkUpdate,
})(MessagesContainer);
