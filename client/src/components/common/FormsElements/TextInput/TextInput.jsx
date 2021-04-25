import {useField } from 'formik';

const TextInput = ({ label, ...props }) => {

    const [field, meta] = useField(props);

    return (
        <>
            <input id={props.id} className={props.inputclass} {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={props.errorclass}>{meta.error}</div>
            ) : null}
        </>
    );
};

export default TextInput;