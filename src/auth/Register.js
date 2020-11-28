import React, { useState } from 'react';
import { Formik, Field, useField } from 'formik';
import { useHistory, NavLink } from 'react-router-dom';
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom'

import axiosInstance from '../axios';


const validate = values => {

	const errors = {};

	if (!values.username) {
		errors.username = 'لطفا نام کاربری خود را وارد کنید';
	} else if (values.username.length > 30) {
		errors.username = 'نام کاربری باید کمتر از 30 کاراکتر باشد';
	}

	if (!values.phonenumber) {
		errors.phonenumber = 'لطفا شماره همراه خود را وارد کنید';
	} else if (!/^09\d{9}$/.test(values.phonenumber)) {
		errors.phonenumber = 'شماره همراه درست وارد نشده است';
	}

	if (!values.password1) {
		errors.password1 = 'لطفا رمز عبور خود را وارد کنید';
	} else if (values.password1.length < 8) {
		errors.password1 = 'رمز عبور باید حداقل 8 کارکتر باشد';
	} else if (!/^(?=.*[a-z])[0-9a-zA-Z_]{6,}$/.test(values.password1)) {
		errors.password1 = 'رمز عبور باید حداقل دارای یک کاراکتر لاتین باشد';
	}

	if (!values.password2) {
		errors.password2 = 'لطفا رمز عبور را تکرار کنید';
	} else if (values.password2 !== values.password1) {
		errors.password2 = 'با رمز عبور وارد شده مطابقت ندارد';
	}

	return errors;
};


// And now we can use these
const RegisterForm = () => {

	const history = useHistory();
	const [usernameFailAlert, setUsernameFailAlert] = useState(false)
	const [phonenumberFailAlert, setPhonenumberFailAlert] = useState(false)

	const handleSubmit = (formData) => {
		console.log(formData);

		axiosInstance
			.post(`user/register/`, {
				username: formData.username,
				phone_number: formData.phonenumber,
				password: formData.password1
			})
			.then((res) => {
				history.push('/login');
				console.log(res);
				console.log(res.data);
			})
			.catch(error => {
				console.log("| error: ", error.response.data.username)
				if (error.response.status === 400 && error.response.data.username)
					setUsernameFailAlert(true)
				if (error.response.status === 400 && error.response.data.phone_number)
					setPhonenumberFailAlert(true)
				else
					alert("خطای غیر منتظره. لطفا مجددا تلاش کنید")
			})
	};

	return (
		<>
			<div className="container border mt-5 p-5">
				<h3 className="mb-5">ایجاد حساب کاربری</h3>

				{usernameFailAlert ? (
					<div className="alert alert-danger" role="alert">
						این نام کاربری قبلا ثبت شده است
					</div>
				) : null}
				{phonenumberFailAlert ? (
					<div className="alert alert-danger" role="alert">
						این شماره همراه قبلا ثبت شده است
					</div>
				) : null}

				<Formik
					initialValues={{
						username: '',
						phonenumber: '',
						password1: '',
						password2: '',
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
								<label htmlFor="phonenumber">شماره تلفن همراه</label>
								<Field
									name="phonenumber"
									className={(formik.touched.phonenumber && formik.errors.phonenumber) ?
										'form-control form-control-lg is-invalid' :
										'form-control form-control-lg'}
									type="text" />

								{formik.touched.phonenumber && formik.errors.phonenumber ? (
									<div className="invalid-feedback">{formik.errors.phonenumber}</div>
								) : null}
							</div>

							<div className="form-group">
								<label htmlFor="password1">رمز عبور</label>
								<Field
									name="password1"
									className={(formik.touched.password1 && formik.errors.password1) ?
										'form-control form-control-lg is-invalid' :
										'form-control form-control-lg'}
									type="password" />

								{formik.touched.password1 && formik.errors.password1 ? (
									<div className="invalid-feedback">{formik.errors.password1}</div>
								) : null}
							</div>

							<div className="form-group">
								<label htmlFor="password2">تکرار رمز عبور</label>
								<Field
									name="password2"
									className={(formik.touched.password2 && formik.errors.password2) ?
										'form-control form-control-lg is-invalid' :
										'form-control form-control-lg'}
									type="password" />

								{formik.touched.password2 && formik.errors.password2 ? (
									<div className="invalid-feedback">{formik.errors.password2}</div>
								) : null}
							</div>

							<button type="submit" className="btn btn-success p-3">ایجاد حساب</button>
						</form>
					)}
				</Formik>
				<hr />
				<p> قبلا ثبت نام کرده اید؟
					<Link to="/login">
						&nbsp;وارد شوید
					</Link>
				</p>
			</div>
		</>
	);
};

export default RegisterForm