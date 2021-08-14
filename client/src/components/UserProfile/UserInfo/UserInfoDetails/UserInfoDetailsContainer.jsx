import { useInput } from "../../../../Hooks/useInputHook";
import { useToggle } from "../../../../Hooks/useToggleHook";
import { withRouter } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  saveBirth,
  saveBook,
  saveCity,
  saveEducation,
  savePhone,
  saveStatus,
} from "../../../../redux/profileReducer";
import { useEffect } from "react";
import UserInfoDetails from "./UserInfoDetails";

const UserInfoDetailsContainer = ({
  city,
  birth,
  education,
  phone,
  book,
  status,
  me,
  saveStatus,
  saveCity,
  saveBirth,
  saveEducation,
  savePhone,
  saveBook,
  ...props
}) => {
  const isMe = me == props.match.params.id;

  const [statusName, setStatusName] = useInput(status);
  const [cityName, setCityName] = useInput(city);
  const [birthName, setBirthName] = useInput(birth);
  const [educationName, setEducationName] = useInput(education);
  const [phoneName, setPhoneName] = useInput(phone);
  const [bookName, setBookName] = useInput(book);

  useEffect(() => {
    setStatusName(status);
  }, [status]);
  useEffect(() => {
    setCityName(city);
  }, [city]);
  useEffect(() => {
    setBirthName(birth);
  }, [birth]);
  useEffect(() => {
    setEducationName(education);
  }, [education]);
  useEffect(() => {
    setPhoneName(phone);
  }, [phone]);
  useEffect(() => {
    setBookName(book);
  }, [book]);

  const [statusMode, setStatusMode] = useToggle(false, saveStatus);
  const [cityMode, setCityMode] = useToggle(false, saveCity);
  const [birthMode, setBirthMode] = useToggle(false, saveBirth);
  const [educationMode, setEducationMode] = useToggle(false, saveEducation);
  const [phoneMode, setPhoneMode] = useToggle(false, savePhone);
  const [bookMode, setBookMode] = useToggle(false, saveBook);

  return (
    <UserInfoDetails
      isMe={isMe}
      statusName={statusName}
      cityName={cityName}
      birthName={birthName}
      educationName={educationName}
      phoneName={phoneName}
      bookName={bookName}
      setStatusName={setStatusName}
      setCityName={setCityName}
      setBirthName={setBirthName}
      setEducationName={setEducationName}
      setPhoneName={setPhoneName}
      setBookName={setBookName}
      statusMode={statusMode}
      cityMode={cityMode}
      birthMode={birthMode}
      educationMode={educationMode}
      phoneMode={phoneMode}
      bookMode={bookMode}
      setStatusMode={setStatusMode}
      setCityMode={setCityMode}
      setBirthMode={setBirthMode}
      setEducationMode={setEducationMode}
      setPhoneMode={setPhoneMode}
      setBookMode={setBookMode}
    />
  );
};

export default compose(
  withRouter,
  connect(null, {
    saveStatus,
    saveCity,
    saveBirth,
    saveEducation,
    savePhone,
    saveBook,
  })
)(UserInfoDetailsContainer);
