
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {getCookie,setCookie,deleteCookie} from '../../Cookie'

//initialState
const initialState = {
	user:null,	
	isLogin: false,
};

export const user = createSlice({
  name: 'users',
  initialState,
  reducers: {
		login : (state,actions) => {
			setCookie('isLogin','success');
			state.user = 	actions.payload.user;
			state.isLogin = true
			console.log(`login : ${state} ${actions}`);
      },
		logout : (state) => {
			deleteCookie('isLogin')
			state.user = 	null;
			state.isLogin = false;
			console.log(`logout : ${state}`);
		},
		getUser : (state,actions) =>  {
			console.log(`getUser : ${state} ${actions}`);
		}
	}	
})

export const { login,logout,getUser } = user.actions;
export default user.reducer;