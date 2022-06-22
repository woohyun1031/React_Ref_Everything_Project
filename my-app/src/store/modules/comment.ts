import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs, orderBy, query, where,doc, updateDoc, increment,} from 'firebase/firestore';
import moment from 'moment';
import { db } from '../../shared/firebase';
import { RootState } from '../configStore';

//initialState
type CommentType = {
  id: string;
	user_profile: string;
	user_name: string;
	user_id: string;
	post_id: string;
	contents: string;
	insert_dt: string;
};

type initialStateType = {
	comment_list: CommentType[];	
  is_loading:boolean;
};

const initialState: initialStateType = {
	comment_list: [],
  is_loading:false,
};


export const addComment = createAsyncThunk(
	'user/addComment',
	async (comment_info : {post_id : string, contents: string}, thunkAPI) => {
		try {	
      thunkAPI.dispatch(loading());
		  const _user = thunkAPI.getState() as RootState
      let isComment = {
        id:'',
        post_id: comment_info.post_id,
        user_id: _user.user.user.user_uid,
        user_name: _user.user.user.user_name,
        user_profile: _user.user.user.user_profile,
        contents: comment_info.contents,
        insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
      }
      await addDoc(collection(db,'comment'),{...isComment})
      .then(async(isdoc)=>{
        isComment = {...isComment, id: isdoc.id};        
        const updateRef = doc(db,'post', comment_info.post_id);		
        await updateDoc(updateRef,{ comment_cnt : increment(1)});	
        thunkAPI.dispatch(addCommentList(isComment))
        //const post = _user.post.list.find((l) => l.id === comment_info.post_id);
      })
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);			 
		}
	}
);

export const getComment = createAsyncThunk(
	'user/getComment',
	async (post_id : string, thunkAPI) => {
		try {	      			
      const comment_query = query(
        collection(db,'comment'),
        where('post_id','==', post_id),
        orderBy("insert_dt", "desc"),		
      );       
      const commentDB = await getDocs(comment_query);   
      console.log(commentDB,'commentDB')   
      const commentList : any = [];      
      commentDB.forEach((comment)=> {
        commentList.push({...comment.data(),id:comment.id})
      })
      console.log(commentList,'commentList')   
      thunkAPI.dispatch(setCommentList(commentList))
		} catch (error) {
			console.log(`알 수 없는 오류: ${error}`);			 
		}
	}
);

export const comment = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setCommentList:(state,action) => {
      state.comment_list = [...action.payload];
      state.is_loading = false;
    },
		addCommentList:(state,action) => {
      state.comment_list = [...state.comment_list,action.payload];
      state.is_loading = false;
    },
		loading:(state) => {
      state.is_loading = true;
    },
	},
	extraReducers: (builder) => {	
		builder.addCase(getComment.fulfilled, (state, action) => {});	
		builder.addCase(addComment.fulfilled, (state, action) => {});	
	},
	},
);

export const { setCommentList,addCommentList,loading } = comment.actions;
export default comment.reducer;
