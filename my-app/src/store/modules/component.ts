import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, doc, getDoc, query, orderBy, updateDoc, limit, startAt, startAfter } from 'firebase/firestore';
import { db, storage } from '../../shared/firebase';
import moment from 'moment';
import {RootState} from '../configStore';
import { getDownloadURL, ref, uploadString, } from 'firebase/storage';
import { uploadComplete } from './image';

type ItemType = {
  id?: string;
  image_url?:string;
  Item_url?:string;
  title?:string;
  contents?:string;
  insert_dt?: string;  
}

type ComponentType = {
  id?: string;
  component_title?:string;
  item_list?: ItemType[]
};

//initialState
type initialStateType = {
	list: ComponentType[];	
	is_loading:boolean;
};

const initialState: initialStateType = {
	list: [],	
  is_loading: false,
};

const userDefaultImgae = 'images/man_default_image.png';
const ItemDefaultUrl = 'https://www.google.com/search?q=default+props&oq=default+props&aqs=chrome..69i57.2583j0j7&sourceid=chrome&ie=UTF-8'

const initialComponent : ComponentType = {
	id:'0',
  component_title:'😀Components Title',
  item_list: [
    {
      id:'abcdefghijklmnop',
      image_url:userDefaultImgae,
      Item_url:ItemDefaultUrl,
      title:'Title',
      contents:'간단한 설명이 적혀 있습니다.',
      insert_dt: '20xx-xx-xx- hh:mm:ss',
    },
    {
      id:'1234567890abcde',
      image_url:userDefaultImgae,
      Item_url:ItemDefaultUrl,
      title:'Title',
      contents:'간단한 설명이 적혀 있습니다.',
      insert_dt: '20xx-xx-xx- hh:mm:ss',
    }
  ]
};

export const getComponent = createAsyncThunk(
	'user/getComponent',
	async (_,thunkAPI) => {
		try {	
		
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);			 
		}
	}
);

export const component = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setPostInit:(state) => {
			state.list = initialState.list;			
			state.is_loading = false;	
		},
		setPost: (state, action) => {
			if(action.payload){
				state.list.push(...action?.payload?.post_list);				
				state.is_loading = false;	
			}else {
				state.list = [initialComponent]
			}		
		},
		loading: (state) => {
		 state.is_loading = true;
		},
	},
	extraReducers: (builder) => {	
		builder.addCase(getComponent.fulfilled, (state, action) => {});			
	},
	},
);

export const { setPostInit,setPost,loading, } = component.actions;
export default component.reducer;
