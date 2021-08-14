import moment from "moment";
import DialogMessage from "./DialogMessage";

const DialogMessageContainer = ({ message, myId, isTempMessage }) => {
  let data = moment(message.date).calendar();
  let isMyMessage;

  if (myId == message.from._id) {
    isMyMessage = true;
  } else {
    isMyMessage = false;
  }

  return (
    <DialogMessage
      message={message}
      isTempMessage={isTempMessage}
      data={data}
      isMyMessage={isMyMessage}
    />
  );
};

export default DialogMessageContainer;
