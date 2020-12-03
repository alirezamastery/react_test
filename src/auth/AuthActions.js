import axiosInstance from '../axios';


export async function loginUser(dispatch, loginPayload) {
    try {
        dispatch({ type: 'REQUEST_LOGIN' });

        let response = await axiosInstance.post(`token/`, loginPayload);
        // console.log("in loginUser | data:", response)

        if (response.status === 200) {
            const tokenParts = JSON.parse(atob(response.data.access.split('.')[1]));
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('user_id', tokenParts.user_id);
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');

            dispatch({ type: 'LOGIN_SUCCESS', payload: { user_id: tokenParts.user_id } });

            return response;
        }

        dispatch({ type: 'LOGIN_ERROR', error: response.errors.message });
        console.log("in loginUser | try:", response.errors);
        return;

    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error.response.status });
        console.log("in loginUser | catch:", error);
        throw new Error(error)
    }
}

export async function logout(dispatch) {
    const refreshToken = localStorage.getItem('refresh_token')

    axiosInstance.post('user/logout/blacklist/', {
        refresh_token: refreshToken,
    }).catch(error => {
        console.log("in logout:", error)
    })

    dispatch({ type: 'LOGOUT' });

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
    axiosInstance.defaults.headers['Authorization'] = null;
}
