import React, { useState, useContext } from 'react';
import { Formik, Field, useField } from 'formik';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../axios';
import { loginUser, useAuthState, useAuthDispatch } from '../Context';

const validate = values => {

    const errors = {};

    if (!values.username) {
        errors.username = 'لطفا نام کاربری خود را وارد کنید';
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less';
    }

    if (!values.password) {
        errors.password = 'لطفا رمز عبور خود را وارد کنید';
    } else if (values.password.length > 20) {
        errors.password = 'Must be 20 characters or less';
    }

    return errors;
};



// And now we can use these
const LoginFormTEST = () => {
    // const user = useContext(userContext)

    const history = useHistory();
    const [failAlert, setFailAlert] = useState(false)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAuthDispatch();
    const { loading, errorMessage } = useAuthState(); //loading is used for buttons and inputs "disabled" tag


    const handleSubmit = async (formData) => {
        // console.log(formData);

        try {
            let response = await loginUser(dispatch, formData);
            console.log("in LoginFormTEST | handleSubmit | response:" , response)
            history.push('/');
        } catch (error) {
            console.log("in LoginFormTEST | handleSubmit | error is:" , error.response )
            console.log("in LoginFormTEST | handleSubmit | errorMessage is:" , errorMessage )
            // if (error.response.status === 401)
            //     setFailAlert(true)
            // else
            //     alert("خطای غیر منتظره. لطفا مجددا تلاش کنید")
        }
    };
    console.log("in LoginFormTEST | errorMessage is:" , errorMessage )

    return (
        <>
            <div className="container border mt-5 p-5">
                <h3 className="mb-5">ورود به حساب کاربری</h3>

                {errorMessage ? (
                    <div className="alert alert-danger" role="alert">
                        نام کاربری یا رمز عبور اشتباه است
                    </div>
                ) : null}

                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}

                    validate={validate}

                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            handleSubmit(values)
                            setSubmitting(false);
                        }, 400);
                    }}

                >
                    {formik => (
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">نام کاربری</label>
                                <Field
                                    name="username"
                                    className={(formik.touched.username && formik.errors.username) ?
                                        'form-control form-control-lg is-invalid' :
                                        'form-control form-control-lg'}
                                    type="text" />

                                {formik.touched.username && formik.errors.username ? (
                                    <div className="invalid-feedback">{formik.errors.username}</div>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">رمز عبور</label>
                                <Field
                                    name="password"
                                    className={(formik.touched.password && formik.errors.password) ?
                                        'form-control form-control-lg is-invalid' :
                                        'form-control form-control-lg'}
                                    type="password" />

                                {formik.touched.password && formik.errors.password ? (
                                    <div className="invalid-feedback">{formik.errors.password}</div>
                                ) : null}
                            </div>

                            <button type="submit" className="btn btn-success p-2">ورود به حساب</button>
                        </form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default LoginFormTEST