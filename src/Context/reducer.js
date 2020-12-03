let user = localStorage.getItem('user_id')
	? localStorage.getItem('user_id')
	: '';

export const initialState = {
	userID: '' || user,
	isLoggedIn: false,
	loading: false,
	errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				...initialState,
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				userID: action.payload.user_id,
				isLoggedIn: true,
				loading: false,
			};
		case 'LOGOUT':
			return {
				...initialState,
				userID: '',
				isLoggedIn: false,
			};

		case 'LOGIN_ERROR':
			console.log("in AuthReducer | LOGIN_ERROR |  action.error:", action.error)
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
