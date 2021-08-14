import { Formik, Form } from "formik";
import * as Yup from "yup";
import s from "./Login.module.css";
import cs from "classnames";
import TextInput from "../../common/FormsElements/TextInput/TextInput";

const Login = ({ toggleLogged, login }) => {
  return (
    <div className={s.login__form}>
      <h1>Вхід</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Неправильний формат e-mail")
            .required("Введіть будь ласка e-mail"),
          password: Yup.string().required("Введіть будь ласка пароль"),
        })}
        onSubmit={(values) => {
          login(values);
        }}
      >
        <Form>
          <TextInput
            name="email"
            type="text"
            placeholder="Ваш e-mail"
            inputclass={cs([s.input], "form-control")}
            errorclass={s.error}
          />
          <TextInput
            name="password"
            type="password"
            placeholder="Пароль"
            inputclass={cs([s.input], "form-control")}
            errorclass={s.error}
          />
          <button
            className={cs([s.submit], "w-100", "btn", "btn-lg", "btn-danger")}
            type="submit"
          >
            Увійти
          </button>
          <button
            type="button"
            className={cs([s.btn], "btn", "btn-outline-danger")}
            onClick={() => toggleLogged(false)}
          >
            Зареєструватися
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
