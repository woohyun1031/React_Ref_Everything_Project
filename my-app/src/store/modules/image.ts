import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../shared/firebase';

export const getPost = createAsyncThunk(
	'user/getPost',
	async () => {
		try {
			const postDB = await getDocs(collection(db,'post'));
			const post_list: PostType[] = [];			
			postDB.forEach((post)=> {
				let _post = post.data();
				let new_post = Object.keys(_post).reduce((acc, cur) => {
					if(cur.indexOf('user_') !== -1) {
							return {...acc, user_info:{...acc.user_info, [cur]:_post[cur]}}
					}
					return {...acc, [cur]: _post[cur]}
				},{id:post.id, user_info:{}})
				post_list.push(new_post);
			}			
			)
			return post_list
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);			 
		}
	}
);

type PostType = {
	id: string;
	user_info: {
		user_name?: string;
		user_profile?: string;
		user_id?: string;
	};
	image_url?: string;
	contents?: string;
	comment_cnt?: number;
	insert_dt?: string;
};

//initialState
type initialStateType = {
	list: PostType[];
};
const initialState: initialStateType = {
	list: [],
};

const initialPost : PostType = {
	id:'0',
	user_info: {
		user_name: 'user_name',
		user_profile:
			'https://static.remove.bg/remove-bg-web/6ad52d54336ad62d58e7bd1317d40fb98e377ad5/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg',
		user_id: 'woo1031',
	},
	image_url:
		'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
	contents: 'contents가 들어가는 부분입니다 지금은 Post를 작성하고 있습니다',
	comment_cnt: 10,
	insert_dt: '2021-04-05',
};

export const image = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setPost: (state, action) => {
		},
	},
	extraReducers: (builder) => {	
		builder.addCase(getPost.fulfilled, (state, action) => {
			console.log(action,'signIn.fulfilled');		
			if(action.payload){
				state.list = action.payload;		
			}else {
				state.list = [initialPost]
			}
		});				
	},
	},
);

export const { setPost } = image.actions;
export default image.reducer;
