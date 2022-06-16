
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from 'firebase/auth';
import {deleteCookie,getCookie,setCookie} from '../../shared/Cookie'
import {auth} from '../../shared/firebase'

export const signUp = createAsyncThunk(
	'user/signUp',
	async (signUpInfo: { email: string; password: string; nickName: string},{ rejectWithValue }) => {
		try {
			const user  = await createUserWithEmailAndPassword(auth, signUpInfo.email, signUpInfo.password);					
			if(auth.currentUser) {
				updateProfile(auth.currentUser,{
					displayName: signUpInfo.nickName
				})
			}
			const userInfo = {
				user_name: signUpInfo.nickName,
				user_id: signUpInfo.email,	
				user_profile: '',	
				user_uid: user.user.uid,
			}			
			return userInfo
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
			console.log(user,"user");
			const userInfo = {
				user_name: user.user.displayName,
				user_id: user.user.email,	
				user_profile: '',	
				user_uid: user.user.uid,
			}	
			return userInfo
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);
			return rejectWithValue('An unexpected error occurred');
		}
	}
);

//initialState
type initialStateType = {
	user: {
		user_name: string;
		user_id: string;	
		user_profile: string;	
		user_uid: string;
	}|null,	
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
			console.log(`setUser : ${state} ${actions}`);
			state.user = actions.payload
		}		
	},
	extraReducers: (builder) => {
		builder.addCase(signUp.fulfilled, (state, action) => {
			console.log(action,'signUp.fulfilled');
			setCookie('isLogin','login Tocen')	
			setUser(action.payload);
			state.isLogin = true;			
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			console.log(action,'signIn.fulfilled');
			setCookie('isLogin','login Tocen')	
			setUser(action.payload);
			state.isLogin = true;			
			
		});				
	},
})

export const { logout,getUser,setUser } = user.actions;
export default user.reducer;
