import s from "./UserInfoDetails.module.css";
import cs from "classnames";

const UserInfoDetails = ({
  isMe,
  statusName,
  cityName,
  birthName,
  educationName,
  phoneName,
  bookName,
  setStatusName,
  setCityName,
  setBirthName,
  setEducationName,
  setPhoneName,
  setBookName,
  statusMode,
  cityMode,
  birthMode,
  educationMode,
  phoneMode,
  bookMode,
  setStatusMode,
  setCityMode,
  setBirthMode,
  setEducationMode,
  setPhoneMode,
  setBookMode,
}) => {
  return (
    <div className={s.user__desc}>
      <div className={cs([s.user__status])}>
        {statusMode ? (
          <input
            onBlur={setStatusMode}
            value={statusName}
            onChange={(e) => {
              setStatusName(e.target.value);
            }}
            autoFocus={true}
            maxLength="200"
          />
        ) : (
          <span
            className={cs([s.user__statusSpan], [isMe && s.user__myStatusSpan])}
            title={isMe && "Натисність двічі, щоб змінити статус"}
            onDoubleClick={isMe && setStatusMode}
          >
            {statusName ? statusName : "___"}
          </span>
        )}
      </div>
      <div className={s.user__labels}>
        <div className={s.user__label}>
          <div>Місто:</div>
        </div>
        <div className={s.user__label}>
          <div>Дата народження:</div>
        </div>
        <div className={s.user__label}>
          <div>Освіта:</div>
        </div>
        <div className={s.user__label}>
          <div>Телефон:</div>
        </div>
        <div className={s.user__label}>
          <div>Улюблена книга:</div>
        </div>
      </div>
      <div className={s.user__answers}>
        <div className={s.user__label}>
          {cityMode ? (
            <input
              onBlur={setCityMode}
              value={cityName}
              onChange={(e) => {
                setCityName(e.target.value);
              }}
              autoFocus={true}
              maxLength="25"
            />
          ) : (
            <div
              title={isMe && "Натисність двічі, щоб змінити місто"}
              className={isMe && s.user__labelDiv}
              onDoubleClick={isMe && setCityMode}
            >
              {cityName ? cityName : "___"}
            </div>
          )}
        </div>
        <div className={s.user__label}>
          {birthMode ? (
            <input
              onBlur={setBirthMode}
              value={birthName}
              onChange={(e) => {
                setBirthName(e.target.value);
              }}
              autoFocus={true}
              maxLength="25"
            />
          ) : (
            <div
              title={isMe && "Натисність двічі, щоб змінити дату"}
              className={isMe && s.user__labelDiv}
              onDoubleClick={isMe && setBirthMode}
            >
              {birthName ? birthName : "___"}
            </div>
          )}
        </div>
        <div className={s.user__label}>
          {educationMode ? (
            <input
              onBlur={setEducationMode}
              value={educationName}
              onChange={(e) => {
                setEducationName(e.target.value);
              }}
              autoFocus={true}
              maxLength="25"
            />
          ) : (
            <div
              title={isMe && "Натисність двічі, щоб змінити освіту"}
              className={isMe && s.user__labelDiv}
              onDoubleClick={isMe && setEducationMode}
            >
              {educationName ? educationName : "___"}
            </div>
          )}
        </div>
        <div className={s.user__label}>
          {phoneMode ? (
            <input
              onBlur={setPhoneMode}
              value={phoneName}
              onChange={(e) => {
                setPhoneName(e.target.value);
              }}
              autoFocus={true}
              maxLength="25"
            />
          ) : (
            <div
              title={isMe && "Натисність двічі, щоб змінити номер"}
              className={isMe && s.user__labelDiv}
              onDoubleClick={isMe && setPhoneMode}
            >
              {phoneName ? phoneName : "___"}
            </div>
          )}
        </div>
        <div className={s.user__label}>
          {bookMode ? (
            <input
              onBlur={setBookMode}
              value={bookName}
              onChange={(e) => {
                setBookName(e.target.value);
              }}
              autoFocus={true}
              maxLength="25"
            />
          ) : (
            <div
              title={isMe && "Натисність двічі, щоб змінити книгу"}
              className={isMe && s.user__labelDiv}
              onDoubleClick={isMe && setBookMode}
            >
              {bookName ? bookName : "___"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfoDetails;
