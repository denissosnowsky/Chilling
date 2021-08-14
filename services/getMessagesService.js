import Dialog from "../models/Dialog.js";

export const getMessagesService = async (me, dial_id, portion, currentPage) => {
  const dialog = await Dialog.findById(dial_id)
    .populate({ path: "messages", populate: { path: "from" } })
    .populate({ path: "messages", populate: { path: "to" } })
    .populate("speakerOne")
    .populate("speakerTwo");
  const foundId = dialog._id;

  let allMessages = dialog.messages;
  const count = dialog.messages.length;
  allMessages.sort(function (a, b) {
    if (a.date > b.date) {
      return -1;
    }
    if (a.date < b.date) {
      return 1;
    }
    return 0;
  });

  allMessages = allMessages.slice(0, portion * currentPage);

  if (dialog.speakerOne._id == me || dialog.speakerTwo._id == me) {
    return {
      code: 200,
      data: {
        allMessages,
        foundId,
        count,
        speakers: [
          { id: dialog.speakerOne._id, img: dialog.speakerOne.sImg },
          { id: dialog.speakerTwo._id, img: dialog.speakerTwo.sImg },
        ],
      },
    };
  } else {
    return {
      code: 500,
      data: { message: "Це приватний діалог", resultCode: 0 },
    };
  }
};
