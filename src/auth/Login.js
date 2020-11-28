import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';


function Login() {

    const history = useHistory();
    const initialFormData = Object.freeze({
        username: '',
        password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
        console.log("formData: ", formData)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance
            .post(`token/`, {
                username: formData.username,
                password: formData.password,
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                history.push('/');
                window.location.reload();
            });
    };


    return (
        <div className="container border mt-5 p-5">
            <form>
                <div className="form-group">
                    <label htmlFor="usernameInput">نام کاربری*</label>
                    <input
                        type="username"
                        className="form-control form-control-lg"
                        id="usernameInput"
                        name="username"
                        placeholder=""
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">رمز عبور*</label>
                    <input
                        type="password"
                        className="form-control form-control-lg"
                        id="passwordInput"
                        name="password"
                        placeholder=""
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary p-2"
                    onClick={handleSubmit}>
                    وارد شوید
                </button>
            </form>
        </div>
    )
}

export default Login
