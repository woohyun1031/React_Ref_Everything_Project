
import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import {getCookie,setCookie,deleteCookie} from '../../Cookie'
import {auth} from '../../firebase'

export const signUp = createAsyncThunk(
	'user/signUp',
	async (loginInfo: { email: string; password: string},{ rejectWithValue }) => {
		try {
			const user  = await createUserWithEmailAndPassword(auth,loginInfo.email,loginInfo.password);		
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
		},
		setUser : (state,actions) => {
			console.log(`getUser : ${state} ${actions}`);
		}		
	},
	extraReducers: (builder) => {
		builder.addCase(signUp.fulfilled, (state, action) => {
			console.log(action,'signUp.fulfilled');
			state.user = "isLogin";			
			state.isLogin = true;			
		});		
	},
})

export const { login,logout,getUser } = user.actions;
export default user.reducer;
