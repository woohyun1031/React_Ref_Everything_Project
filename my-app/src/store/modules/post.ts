import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, doc, getDoc, query, orderBy, updateDoc, limit, startAt, startAfter } from 'firebase/firestore';
import { db, storage } from '../../shared/firebase';
import moment from 'moment';
import {RootState} from '../configStore';
import { getDownloadURL, ref, uploadString, } from 'firebase/storage';
import { uploadComplete } from './image';

type PostDataType = {
	[index:string] : string|number|undefined;
	user_name?: string;
	user_profile?: string;
	user_id?: string;
	image_url?: string;
	contents?: string;
	comment_cnt?: number;
	insert_dt?: string;
};

type PostType = {
id?: string;
	user_info?: {
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
	paging: { start: any, next: any, size: number },
	is_loading:boolean;
};

const initialState: initialStateType = {
	list: [],
	paging: { start: null, next: null, size: 2},
  is_loading: false,
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

const defaultImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII='

export const addPost = createAsyncThunk(
	'user/addPost',
	async(contents : string, thunkAPI) => {
		try{
			thunkAPI.dispatch(setPostInit())
			const _user = thunkAPI.getState() as RootState
			const storageRef = ref(storage, `images/${_user.user.user.user_id}_${new Date().getTime()}`);   						
			await uploadString(storageRef, _user.image.preview, 'data_url')			
			.then(async(snapshot) => {				
				await getDownloadURL(snapshot.ref)
				.then((downloadURL)=>{							
				return downloadURL
				}).then(async(downloadURL)=>{
					const user_info = {
						user_name: _user.user.user?.user_name,
						user_id : _user.user.user?.user_uid,
						user_profile:_user.user.user?.user_profile,				
					}
					const post_info = {
						image_url:defaultImage,				
						comment_cnt: 0,
						contents,
						insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
					}			
				  await addDoc(collection(db,'post'),{...user_info,...post_info, image_url:downloadURL})
					.then(async()=>{
					thunkAPI.dispatch(uploadComplete(downloadURL));	
					});	
				})								
			})							
		} catch (error) {
			alert(error);
		}
	}
)

export const updatePost = createAsyncThunk(
	'user/updatePost',
	async(new_post_info:{isContents:string, postId:string} , thunkAPI) => {
		try{			
			thunkAPI.dispatch(setPostInit())
			const _user = thunkAPI.getState() as RootState
			if(_user.image.preview === ''){				
				const updateRef = doc(db,'post',new_post_info.postId);			
				await updateDoc(updateRef,{contents:new_post_info.isContents,})				
			}
			else {
				const storageRef = ref(storage, `images/${_user.user.user.user_id}_${new Date().getTime()}`);   						
				await uploadString(storageRef, _user.image.preview, 'data_url')			
				.then(async(snapshot) => {				
					await getDownloadURL(snapshot.ref)
				.then((downloadURL)=>{			
					thunkAPI.dispatch(uploadComplete(downloadURL));   
					return downloadURL
				})
				.then(async(downloadURL)=>{
					const post_info = {
						image_url:downloadURL,	
						contents:new_post_info.isContents,
					}
					thunkAPI.dispatch(uploadComplete(downloadURL));	
					const updateRef = doc(db,'post',new_post_info.postId);			
					await updateDoc(updateRef,{...post_info});
				})})							
			}
		} 
		catch (error) {
			alert(error);
		}
	}
)

export const getPost = createAsyncThunk(
	'user/getPost',
	async (_,thunkAPI) => {
		try {	
			let _paging = thunkAPI.getState() as RootState						
			let post_query;
			
			if(!_paging.post.paging.next && _paging.post.paging.start ) return alert('마지막 페이지 입니다')
			
			thunkAPI.dispatch(loading());			

			if(_paging.post.paging.start) {
				post_query = query(
					collection(db,'post'),
					orderBy("insert_dt", "desc"),								
					startAfter(_paging.post.paging.start),
					limit(_paging.post.paging.size+1),
				)	
			} else {
				post_query = query(
					collection(db,'post'),
					orderBy("insert_dt", "desc"),								
					limit(_paging.post.paging.size+1),
				);		
			}
			
			const postDB = await getDocs(post_query);
			const post_list: PostType[] = [];								
			
			const paging = {
				start: postDB.docs[_paging.post.paging.size - 1],
				next: postDB.docs.length === _paging.post.paging.size + 1 ? 
				postDB.docs[postDB.docs.length - 1] : 
				null,
				size: _paging.post.paging.size,
			};

			postDB.forEach((post)=> {
				let _post = post.data();
				let new_post = Object.keys(_post).reduce((acc, cur) => {
					if(cur.indexOf('user_') !== -1) {
						return {...acc, user_info:{...acc.user_info, [cur]:_post[cur]}}
					}
					return {...acc, [cur]: _post[cur]}
				},{id: post.id, user_info: {}})
				post_list.push(new_post);
			})

			
			if(paging.next) post_list.pop();						
			thunkAPI.dispatch(setPost({post_list, paging}))			
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);			 
		}
	}
);

export const getOnePost = createAsyncThunk(
	'user/getOnePost',
	async (postId:string) => {
		try {			
			const postDB = await getDoc(doc(db, "post", postId));				
			let post_data : PostDataType = {};

			if (postDB.exists()) {
				post_data = postDB.data();
			} else {				
				return alert("No such document!");
			}			

			let isPost = Object.keys(post_data).reduce(
				(acc, cur) => {
					if (cur.indexOf("user_") !== -1) {
						return {
							...acc,
							user_info: { ...acc.user_info, [cur]: post_data[cur] },
						};
					}
					return { ...acc, [cur]: post_data[cur] };
				},
				{ id: postDB.id, user_info: {} }
			);

			//const { user_name,user_profile,user_id,image_url,contents,comment_cnt,insert_dt } = post_data; 		
			//const new_array = {user_info:{user_name,user_profile,user_id},image_url,contents,comment_cnt,insert_dt};			
			
			//return new_array
			return isPost
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);			 
		}
	}
);

export const post = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setPostInit:(state) => {
			state.list = initialState.list;
			state.paging = initialState.paging;
			state.is_loading = false;	
		},
		setPost: (state, action) => {
			if(action.payload){
				state.list.push(...action?.payload?.post_list);
				state.paging = {...action?.payload?.paging};
				state.is_loading = false;	
			}else {
				state.list = [initialPost]
			}		
		},
		loading: (state) => {
		 state.is_loading = true;
		},
	},
	extraReducers: (builder) => {	
		builder.addCase(getPost.fulfilled, (state, action) => {});	
		builder.addCase(updatePost.fulfilled, (state, action) => {});				
	},
	},
);

export const { setPostInit,setPost,loading, } = post.actions;
export default post.reducer;
