
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,updateProfile } from 'firebase/auth';
import { userInfo } from 'os';
import {deleteCookie,getCookie,setCookie} from '../../shared/Cookie'
import {auth} from '../../shared/firebase'

const userDafaultImgae = 'images/man_default_image.png';

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
				user_profile: userDafaultImgae,	
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
				user_name: user.user.displayName ? user.user.displayName : '',
				user_id: user.user.email ? user.user.email : '',	
				user_profile: userDafaultImgae,	
				user_uid: user.user.uid,
			}	
			return userInfo
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);
			return rejectWithValue('An unexpected error occurred');
		}
	}
);

export const getUserInfo = createAsyncThunk(
	'user/getUserInfo',
	async (_,thunkAPI) => {
		try {
			const user = auth.currentUser;
			if(user) {
				const userInfo = {
					user_name: user.displayName,
					user_id: user.email,	
					user_profile: userDafaultImgae,	
					user_uid: user.uid,
				}
				thunkAPI.dispatch(setUser(userInfo));	
			}	else {
				return;
			}								
		}
		catch (error) {
			return alert(`알 수 없는 오류: ${error}`);			
		}
	}
);

export const logoutDB = createAsyncThunk(
	'user/logoutDB',
	async (_,thunkAPI) => {
		try {
			signOut(auth).then(()=>{
			thunkAPI.dispatch(logout());	
			})
		} catch (error) {
			return alert(`알 수 없는 오류: ${error}`);			
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
	},	
	isLogin: boolean,
}

const initialState:initialStateType = {
	user:{		
		user_name: '',
		user_id: '',
		user_profile: '',
		user_uid: '',
	} ,	
	isLogin: false,
};

export const user = createSlice({
  name: 'users',
  initialState,
  reducers: {
		logout : (state) => {
			deleteCookie('isLogin')
			state.user = 	{		
				user_name: '',
				user_id: '',
				user_profile: '',
				user_uid: '',
			};
			state.isLogin = false;
			console.log(`logout : ${state}`);
		},
		getUser : (state,actions) =>  {
			state.user = {...actions.payload}
			console.log(`getUser : ${state} ${actions}`);
		},
		setUser : (state,actions) => {
			console.log(`setUser : ${state} ${actions}`);			
			setCookie('isLogin','login Token')						
			state.user = {		
				user_name: actions.payload.user_name,
				user_id: actions.payload.user_id,
				user_profile: actions.payload.user_profile,
				user_uid: actions.payload.user_uid,
			}
			state.isLogin = true;		
		}		
	},
	extraReducers: (builder) => {
		builder.addCase(signUp.fulfilled, (state, action) => {
			console.log(action,'signUp.fulfilled');
			setCookie('isLogin','login Token')	
			setUser(action.payload);
			state.isLogin = true;			
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			console.log(action,'signIn.fulfilled');
			setCookie('isLogin','login Token')						
			state.user = {		
				user_name: action.payload.user_name,
				user_id: action.payload.user_id,
				user_profile: action.payload.user_profile,
				user_uid: action.payload.user_uid,
			}
			state.isLogin = true;						
		});							
	},
})

export const { logout,getUser,setUser } = user.actions;
export default user.reducer;
