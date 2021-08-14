import { connect } from "react-redux";
import { registerThunk, loginThunk, messageOut } from "../../redux/authReducer";
import LogSign from "./LogSign";
import { useState, useEffect } from "react";

const LogSignContainer = ({
  message,
  isRegistered,
  isFetching,
  registerThunk,
  loginThunk,
  messageOut,
}) => {
  const [logged, toggleLogged] = useState(true);

  useEffect(() => {
    isRegistered && toggleLogged(true);
  }, [isRegistered]);

  useEffect(() => {
    message &&
      setTimeout(() => {
        messageOut();
      }, 3000);
  }, [message]);

  return (
    <LogSign
      message={message}
      isRegistered={isRegistered}
      isFetching={isFetching}
      registerThunk={registerThunk}
      loginThunk={loginThunk}
      messageOut={messageOut}
      logged={logged}
      toggleLogged={toggleLogged}
    />
  );
};

const mapStateToProps = (state) => ({
  message: state.authPage.registrationMessage,
  isRegistered: state.authPage.isRegistered,
  isFetching: state.authPage.isFetching,
});

export default connect(mapStateToProps, {
  registerThunk,
  loginThunk,
  messageOut,
})(LogSignContainer);
