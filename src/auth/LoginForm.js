import React, { useState, useContext } from 'react';
import { Formik, Field, useField } from 'formik';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../axios';
// import { loginUser, useAuthState, useAuthDispatch } from '../Context';
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from './AuthActions'

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

const LoginForm = () => {

    const history = useHistory();

    const auth = useSelector(state => state.auth)
    const warning = useSelector(state => state.warning)
    const dispatch = useDispatch()


    const handleSubmit = async (formData) => {
        try {
            let response = await loginUser(dispatch, formData);
            console.log("in LoginFormTEST | handleSubmit | response:", response)
            history.push('/');
        } catch (error) {
            console.log("in LoginFormTEST | handleSubmit | error is:", error.response)
            console.log("in LoginFormTEST | handleSubmit | auth.errorMessage is:", auth.errorMessage)
        }
    };
    // console.log("in LoginForm | auth.errorMessage is:", auth.errorMessage)

    return (
        <div className="col-sm-12 col-md-9 col-lg-6 col-xl-4 mx-auto">
            <div className="container border mt-5 p-5">

                <h3 className="mb-5">ورود به حساب کاربری</h3>

                {auth.errorMessage ? (
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

                            <button type="submit" className="btn btn-success rounded-0 p-2">ورود به حساب</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginForm