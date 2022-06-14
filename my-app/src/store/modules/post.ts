import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { setCookie } from '../../shared/Cookie';
import { db } from '../../shared/firebase';

export const getPost = createAsyncThunk(
	'user/getPost',
	async () => {
		try {
			const postDB = await getDocs(collection(db,'post'));
			const post_list = [];			
			postDB.forEach((post)=> {
				const {	user_name,user_profile,user_id,	image_url,contents,comment_cnt,insert_dt} = post.data();
				let _post: newPostType = {
					id: post.id,
					user_name,
					user_profile,
					user_id,
					image_url,
					contents,
					comment_cnt,
					insert_dt
				};
				let new_post = {
				id: _post.id,
				user_info: {
					user_name: _post.user_name,
					user_profile: _post.user_profile,
					user_id: _post.user_id
				},
				image_url: _post.image_url,
				contents: _post.contents,
				comment_cnt: _post.comment_cnt,
				insert_dt: _post.insert_dt,}
				post_list.push(new_post);
			}			
			)
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);			 
		}
	}
);
type newPostType = {	
	id: string,
	user_name: string,
	user_profile: string,
	user_id: string,	
	image_url: string,
	contents: string,
	comment_cnt: number,
	insert_dt: string,
}	


type PostType = {
	id?: string;
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
	},
});

export const { setPost } = post.actions;
export default post.reducer;
