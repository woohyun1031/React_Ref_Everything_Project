import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../shared/firebase';
import moment from 'moment';
import {RootState } from '../configStore';

export const addPost = createAsyncThunk(
	'user/addPost',
	async (contents : string, thunkAPI) => {
		try{
			const _user = thunkAPI.getState() as RootState
			const user_info = {
				user_name: _user.user.user?.user_name,
				user_id : _user.user.user?.user_uid,
				user_profile:_user.user.user?.user_profile,				
			}
			const post_info = {
				image_url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII=',				
				comment_cnt: 0,
				contents,
				insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
			}
			console.log(user_info, post_info);
			return
			const docRef = await addDoc(collection(db,'post'),{...user_info,...post_info});	
			console.log(docRef);
		} catch (error) {
			console.log(error);
		}
	}
)

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

export const post = createSlice({
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

export const { setPost } = post.actions;
export default post.reducer;