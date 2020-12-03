let user_id = localStorage.getItem('user_id')
    ? localStorage.getItem('user_id')
    : '';

export const initialState = {
    userID: user_id,
    isLoggedIn: false,
    loading: false,
    errorMessage: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return {
                ...state,
                loading: true,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                userID: action.payload.user_id,
                isLoggedIn: true,
                loading: false,
                errorMessage: ''
            };
        case 'LOGOUT':
            return {
                ...state,
                userID: '',
                isLoggedIn: false,
            };

        case 'LOGIN_ERROR':
            console.log("in AuthReducer | LOGIN_ERROR | action.error:", action.error)
            return {
                ...state,
                loading: false,
                errorMessage: action.error,
            };

        default:
            return state
    }
};


export default authReducer