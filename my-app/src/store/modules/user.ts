
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {getCookie,setCookie,deleteCookie} from '../../Cookie'

const initialState = {
	user:null,	
	isLogin: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
		login : (state,actions) => {
			setCookie('isLogin','success');
			state.user = 	actions.payload.user;
			state.isLogin = true
			console.log(`logout : ${state} ${actions}`);
      },
		logout : (state,actions) => {
			console.log(`logout : ${state} ${actions}`);
		},
		getUser : (state,actions) =>  {
			console.log(`logout : ${state} ${actions}`);
		}
	}	
})

export const { login,logout,getUser } = usersSlice.actions;
export default usersSlice.reducer;