import React, { useState , useContext } from 'react';
import { Formik, Field, useField } from 'formik';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../axios';

import { userContext } from '../userContext';

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


const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);

  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="form-control form-control-lg" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">
          {meta.error}
        </div>
      )
        : null}
    </div>
  );
};



// And now we can use these
const LoginForm = () => {
  // const user = useContext(userContext)

  const history = useHistory();
  const [failAlert, setFailAlert] = useState(false)

  const handleSubmit = (formData) => {
    console.log(formData);

    axiosInstance
      .post(`token/`, {
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        setFailAlert(false)
        console.log("login response: ", res)
        const tokenParts = JSON.parse(atob(res.data.access.split('.')[1]));

        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        localStorage.setItem('user_id', tokenParts.user_id);
        axiosInstance.defaults.headers['Authorization'] =
          'JWT ' + localStorage.getItem('access_token');

        // user.setUser(tokenParts.user_id)

        history.push('/');
        window.location.reload();
      })
      .catch(error => {
        if (error.response.status === 401)
          setFailAlert(true)
        else
          alert("خطای غیر منتظره. لطفا مجددا تلاش کنید")
      })
  };

  return (
    <>
      <div className="container border mt-5 p-5">
        <h3 className="mb-5">ورود به حساب کاربری</h3>

        {failAlert ? (
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

export default LoginForm