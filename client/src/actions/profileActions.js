import axios from 'axios';
import {
	CLEAR_CURRENT_PROFILE,
	GET_PROFILE,
	PROFILE_LOADING,
	SET_CURRENT_USER,
	GET_ERRORS
} from './types';

//get current profile
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profile')
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILE,
				payload: {}
			})
		);
};

//create profile
export const createProfile = (profileData, history) => dispatch => {
	axios
		.post('/api/profile', profileData)
		.then(res => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

//edit profile
export const editProfile = (profileData, history) => dispatch => {
	axios
		.post('/api/profile', profileData)
		.then(res => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

//delete account and profile
export const deleteAccount = () => dispatch => {
	if (window.confirm('Are you sure? This cannot be undone!')) {
		axios
			.delete('/api/profile')
			.then(res =>
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				})
			)
			.catch(err =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
	}
};

//profile loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};

//clear profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};