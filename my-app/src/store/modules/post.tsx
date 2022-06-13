import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { deleteCookie, setCookie } from '../../shared/Cookie';
import { auth } from '../../shared/firebase';

export const signUp = createAsyncThunk(
	'user/signUp',
	async (
		signUpInfo: { email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const user = await createUserWithEmailAndPassword(
				auth,
				signUpInfo.email,
				signUpInfo.password
			);
			console.log(user.user.email, 'user');
			return user.user.email;
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);
			return rejectWithValue('An unexpected error occurred');
		}
	}
);

type PostType = {
	id?: number;
	user_info: {
		user_name: string;
		user_profile: string;
	};
	image_url: string;
	contents: string;
	comment_cnt: number;
	insert_dt: string;
};

//initialState
type initialStateType = {
	list: PostType[] | null;
};
const initialState: initialStateType = {
	list: [],
};
const initialPost = {
	user_info: {
		user_name: 'user_name',
		user_profile:
			'https://static.remove.bg/remove-bg-web/6ad52d54336ad62d58e7bd1317d40fb98e377ad5/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg',
	},
	image_url:
		'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
	contents: 'contents가 들어가는 부분입니다 지금은 Post를 작성하고 있습니다',
	comment_cnt: 10,
	insert_dt: '2021-04-05',
};

export const post = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setPost: (state, action) => {},
	},
	extraReducers: (builder) => {
		builder.addCase(signUp.fulfilled, (state, action) => {
			console.log(action, 'signUp.fulfilled');
			setCookie('isLogin', 'login Tocen');
		});
	},
});

export const { setPost } = post.actions;
export default post.reducer;
