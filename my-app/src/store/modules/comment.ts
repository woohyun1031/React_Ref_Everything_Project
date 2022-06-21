import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//initialState
type CommentType = {
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
	async (_,thunkAPI) => {
		try {	
					
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);			 
		}
	}
);

export const getComment = createAsyncThunk(
	'user/getComment',
	async (_,thunkAPI) => {
		try {	
					
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);			 
		}
	}
);

export const comment = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setCommentLIst:(state,action) => {},
		addCommentList:(state,action) => {},
		loading:(state,action) => {
      state.is_loading = true;
    },
	},
	extraReducers: (builder) => {	
		builder.addCase(getComment.fulfilled, (state, action) => {});	
		builder.addCase(addComment.fulfilled, (state, action) => {});	
	},
	},
);

export const { setCommentLIst,addCommentList,loading } = comment.actions;
export default comment.reducer;
