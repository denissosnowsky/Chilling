import Message from "./Message";

const MessageContainer = ({ dialog, myId }) => {
  let lastMessage;
  let opponent;

  if (myId == dialog.speakerOne._id) {
    opponent = dialog.speakerTwo;
  } else {
    opponent = dialog.speakerOne;
  }

  if (dialog.messages.length > 0) {
    if (dialog.messages[dialog.messages.length - 1].text.length > 60) {
      const oldMessage = dialog.messages[dialog.messages.length - 1].text;
      lastMessage = oldMessage.slice(0, 60) + "...";
    } else {
      lastMessage = dialog.messages[dialog.messages.length - 1].text;
    }
  } else {
    lastMessage = "Поки немає повідомлень";
  }

  if (lastMessage.length == 0) {
    lastMessage = "Картинка";
  }

  return (
    <Message dialog={dialog} lastMessage={lastMessage} opponent={opponent} />
  );
};

export default MessageContainer;
