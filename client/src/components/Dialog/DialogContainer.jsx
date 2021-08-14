import { withRouter } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  addMessageThunk,
  fetchingLoadMessage,
  getMessagesThunk,
  getMessagesThunkUpdate,
  joinToDialogThunk,
  leaveTheDialogThunk,
  sendMessageThunk,
  setDialogId,
  setIsTempMessage,
  setIsTempPic,
  setTempMessage,
  setTempPict,
  shouldUpadateFunc,
} from "../../redux/messageReducer";
import { useEffect, useRef, useState } from "react";
import { useInput } from "../../Hooks/useInputHook";
import { useHistory } from "react-router-dom";
import Dialog from "./Dialog";
import { url } from "../../config";

const DialogContainer = ({
  getMessagesThunk,
  messages,
  myId,
  menuMessage,
  speakers,
  addMessageThunk,
  setTempPict,
  tempPic,
  setIsTempPic,
  isTempPic,
  setTempMessage,
  isTempMessage,
  setIsTempMessage,
  messageCount,
  portionMessages,
  shouldUpadate,
  shouldUpadateFunc,
  fetchingLoadMessage,
  isFetchingLoadMessage,
  isFetchingMessages,
  getMessagesThunkUpdate,
  foundId,
  setDialogId,
  sendMessageThunk,
  joinToDialogThunk,
  leaveTheDialogThunk,
  ...props
}) => {
  const formRef = useRef(null);
  let wrapper = useRef(null);
  let prevScrollHeight = useRef("");
  let id = props.match.params.id;
  let speakerImg;
  let to;
  const [text, setText] = useInput("");
  const [img, setImg] = useInput("");
  const [tempImg, setTempImg] = useInput("");
  const [currentPage, setCurrentPage] = useState(1);

  //gives error if dialog doesn't exist
  let history = useHistory();
  function redirectToError() {
    setDialogId(1);
    history.push("/error404");
  }
  if (foundId == 0) {
    redirectToError();
  }

  useEffect(() => {
    if (shouldUpadate) {
      if (
        wrapper.current.scrollHeight -
          wrapper.current.clientHeight -
          wrapper.current.scrollTop <=
          wrapper.current.clientHeight + 100 ||
        wrapper.current.scrollTop == 0
      ) {
        wrapper.current.scrollTop = wrapper.current.scrollHeight;
      }
    } else {
      shouldUpadateFunc(true);
      wrapper.current.scrollTop =
        wrapper.current.scrollHeight -
        prevScrollHeight.current -
        wrapper.current.clientHeight +
        200;
    }
  }, [messages, isFetchingMessages]);

  useEffect(() => {
    prevScrollHeight.current = wrapper.current.scrollHeight;
  }, [currentPage]);

  useEffect(() => {
    getMessagesThunk(id, portionMessages, currentPage);
    wrapper.current.scrollTop = wrapper.current.scrollHeight;

    joinToDialogThunk(id);

    return () => {
      leaveTheDialogThunk(id);
    };
  }, []);

  if (speakers.length > 0) {
    if (myId == speakers[0].id) {
      speakerImg = url + speakers[1].img;
      to = speakers[1].id;
    } else {
      speakerImg = url + speakers[0].img;
      to = speakers[0].id;
    }
  }

  const loadPhoto = (event) => {
    if (event.target.files.length) {
      setImg(event.currentTarget.files[0]);
    }
    /// set preload photo
    var oFReader = new FileReader();
    oFReader.readAsDataURL(event.currentTarget.files[0]);
    oFReader.onload = function (oFREvent) {
      setTempPict(oFREvent.target.result); //send pic to reducer
      setTempImg(oFREvent.target.result); //send pic to local state
    };
    setIsTempPic(true);
  };

  const submitForm = (event) => {
    formRef.current.reset();
    event.preventDefault();
    addMessageThunk(img, text, to, id, portionMessages, currentPage, myId);
    setText("");
    setTempPict("");
    setIsTempPic(false);
    setTempMessage({
      from: { _id: myId },
      text,
      img: tempImg,
      date: Date.now(),
    });
    setIsTempMessage(true);
  };

  const pagesNumber = Math.ceil(messageCount / portionMessages);
  const loadFunction = () => {
    shouldUpadateFunc(false);
    getMessagesThunkUpdate(id, portionMessages, currentPage + 1);
    setCurrentPage((p) => (p = p + 1));
  };

  return (
    <Dialog
      messages={messages}
      myId={myId}
      tempPic={tempPic}
      isTempPic={isTempPic}
      isTempMessage={isTempMessage}
      isFetchingLoadMessage={isFetchingLoadMessage}
      isFetchingMessages={isFetchingMessages}
      loadFunction={loadFunction}
      pagesNumber={pagesNumber}
      submitForm={submitForm}
      loadPhoto={loadPhoto}
      formRef={formRef}
      wrapper={wrapper}
      speakerImg={speakerImg}
      text={text}
      setText={setText}
      currentPage={currentPage}
    />
  );
};

const mapStateToProps = (state) => ({
  messages: state.messagesPage.messages,
  myId: state.authPage.userId,
  menuMessage: state.messagesPage.menuMessage,
  speakers: state.messagesPage.speakers,
  tempPic: state.messagesPage.tempPic,
  isTempPic: state.messagesPage.isTempPic,
  isTempMessage: state.messagesPage.isTempMessage,
  messageCount: state.messagesPage.messageCount,
  portionMessages: state.messagesPage.portionMessages,
  shouldUpadate: state.messagesPage.shouldUpadate,
  isFetchingLoadMessage: state.messagesPage.isFetchingLoadMessage,
  isFetchingMessages: state.messagesPage.isFetchingMessages,
  foundId: state.messagesPage.foundId,
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getMessagesThunk,
    addMessageThunk,
    setTempPict,
    setIsTempPic,
    setTempMessage,
    setIsTempMessage,
    shouldUpadateFunc,
    fetchingLoadMessage,
    getMessagesThunkUpdate,
    setDialogId,
    sendMessageThunk,
    joinToDialogThunk,
    leaveTheDialogThunk,
  })
)(DialogContainer);
