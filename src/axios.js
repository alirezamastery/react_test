import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('access_token')
			? 'JWT ' + localStorage.getItem('access_token')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});
// axiosInstance.interceptors.request.use(
// 	(request) => {
// 		console.log('request to server: ', request)
// 		return request
// 	}
// )
axiosInstance.interceptors.response.use(
	(response) => {
		// console.log("in axiosInstance | server response: ", response)
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		console.log("in axiosInstance | error: ", error)
		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
				'Looks like CORS might be the problem. ' +
				'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/'
		) {
			// window.location.href = '/login/';
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			// window.location.href = '/login/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				console.log('response.status was 404 so we will use refreshToken: ', refreshToken)
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
				// console.log("tokenParts: ", tokenParts)

				const now = Date.now();
				// exp date in token is expressed in seconds, while now() returns milliseconds:
				if (tokenParts.exp * 1000 > now) {
					return axiosInstance
						.post('/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							// console.log('token refresh |  response.data.access: ', response.data.access);
							// console.log('token refresh |  response.data.refresh: ', response.data.refresh);
							localStorage.setItem('access_token', response.data.access);
							localStorage.setItem('refresh_token', response.data.refresh);

							axiosInstance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log("error in refresh token part: ", err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					throw new Error('refresh_token_expired')
					// window.location.href = '/login/';
				}
			} else {
				console.log('in axiosInstance: Refresh token not available. refreshToken is: ', refreshToken);
				// window.location.href = '/login/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default axiosInstance;