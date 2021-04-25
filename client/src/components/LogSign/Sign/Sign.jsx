import s from './Sign.module.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import cs from 'classnames';
import TextInput from '../../common/FormsElements/TextInput/TextInput';


const Sign = ({toggleLogged, register}) => {
    return(
        <div className={s.sign__form}>
            <h1>Реєстрація</h1>
            <Formik
                initialValues={{
                email: '',
                password: '',
                name: '',
                surname: '',
                city: '',
                }}
                validationSchema={Yup.object({
                email: Yup.string()
                    .email('Неправильний формат e-mail')
                    .required('Введіть будь ласка e-mail'),
                password: Yup.string()
                    .required('Введіть будь ласка пароль'),
                name: Yup.string()
                    .required('Введіть будь ласка Ім\'я'),
                surname: Yup.string()
                    .required('Введіть будь ласка прізвище'),
                city: Yup.string()
                    .required('Введіть будь ласка місто'),
                })}
                onSubmit={(values) => {
                    register(values);
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
                    <TextInput
                        name="name"
                        type="text"
                        placeholder="Ваше ім'я"
                        inputclass={cs([s.input], "form-control")}
                        errorclass={s.error}
                    />
                    <TextInput
                        name="surname"
                        type="text"
                        placeholder="Ваше прізвище"
                        inputclass={cs([s.input], "form-control")}
                        errorclass={s.error}
                    />
                    <TextInput
                        name="city"
                        type="text"
                        placeholder="Ваше місто"
                        inputclass={cs([s.input], "form-control")}
                        errorclass={s.error}
                    />
                    <button className={cs([s.submit], "w-100", "btn", "btn-lg", "btn-danger")} type="submit">Зареєструватися</button>
                    <button type="button" className={cs([s.btn], "btn", "btn-outline-danger")} onClick={()=>toggleLogged(true)}>Увійти</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Sign;