import axiosInstance from '../axios';


export async function loginUser(dispatch, loginPayload) {
    try {
        dispatch({ type: 'REQUEST_LOGIN' });
        let response = await axiosInstance.post(`token/`, loginPayload);
        let data = await response;
        console.log("in loginUser | data:", data)

        if (data.status === 200) {
            const tokenParts = JSON.parse(atob(data.data.access.split('.')[1]));
            localStorage.setItem('access_token', data.data.access);
            localStorage.setItem('refresh_token', data.data.refresh);
            localStorage.setItem('user_id', tokenParts.user_id);
            axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + localStorage.getItem('access_token');

            dispatch({ type: 'LOGIN_SUCCESS', payload: { user_id: tokenParts.user_id } });

            return data;
        }

        dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
        // console.log(data.errors[0]);
        console.log("in loginUser | try:", data.errors[0]);
        return;

    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error });
        console.log("in loginUser | catch:", error.response);
        throw new Error(error)
    }
}

export async function logout(dispatch) {
    const refreshToken = localStorage.getItem('refresh_token')
    console.log("in logout | refreshToken: ", refreshToken)
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
