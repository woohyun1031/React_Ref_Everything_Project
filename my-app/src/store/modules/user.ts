
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {deleteCookie,getCookie,setCookie} from '../../shared/Cookie'
import {auth} from '../../shared/firebase'

export const signUp = createAsyncThunk(
	'user/signUp',
	async (signUpInfo: { email: string; password: string},{ rejectWithValue }) => {
		try {
			const user  = await createUserWithEmailAndPassword(auth, signUpInfo.email, signUpInfo.password);		
			console.log(user.user.email,"user");
			return user.user.email
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);
			return rejectWithValue('An unexpected error occurred');
		}
	}
);

export const signIn = createAsyncThunk(
	'user/signIn',
	async (signInInfo: { email: string; password: string},{ rejectWithValue }) => {
		try {
			const user = await signInWithEmailAndPassword(auth, signInInfo.email, signInInfo.password);
			console.log(user.user.email,"user");
			return user.user.email
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);
			return rejectWithValue('An unexpected error occurred');
		}
	}
);

//initialState
type initialStateType = {
	user: string|null,	
	isLogin: boolean,
}
const initialState:initialStateType = {
	user: null,	
	isLogin: false,
};

export const user = createSlice({
  name: 'users',
  initialState,
  reducers: {
		logout : (state) => {
			deleteCookie('isLogin')
			state.user = 	null;
			state.isLogin = false;
			console.log(`logout : ${state}`);
		},
		getUser : (state,actions) =>  {
			console.log(`getUser : ${state} ${actions}`);
		},
		setUser : (state,actions) => {
			console.log(`getUser : ${state} ${actions}`);
		}		
	},
	extraReducers: (builder) => {
		builder.addCase(signUp.fulfilled, (state, action) => {
			console.log(action,'signUp.fulfilled');
			setCookie('isLogin','login Tocen')
			state.user = "isLogin";			
			state.isLogin = true;			
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			console.log(action,'signIn.fulfilled');
			setCookie('isLogin','login Tocen')
			state.user = "isLogin";			
			state.isLogin = true;			
			
		});				
	},
})

export const { logout,getUser } = user.actions;
export default user.reducer;
