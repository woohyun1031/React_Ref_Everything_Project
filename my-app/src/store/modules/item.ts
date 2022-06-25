import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import moment from 'moment';
import { db } from '../../shared/firebase';
import { RootState } from '../configStore';

//initialState
type initialStateType = {
	list: any;	
	is_loading:boolean;
};

const initialState: initialStateType = {
	list:{},	
  is_loading: false,
};


export const getItem = createAsyncThunk(
	'component/getItem',
	async (component_id:string ,thunkAPI) => {
		try {	      
      const item_query = query(
        collection(db,'item'),
        where('component_id','==', component_id)        
      );  
      const itemDB = await getDocs(item_query);   
      const itemList : any = [];   //[{},{},{}]   
      itemDB.forEach((item)=>{
        itemList.push({...item.data(),id:item.id})
      })
      const new_list = {[component_id] : itemList}
      //const itemInfo = {...new_list};
      //console.log(itemInfo)
      thunkAPI.dispatch(setItem(new_list))      
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);			 
		}
	}
);

export const addItem = createAsyncThunk(
	'component/addItem',
	async (component_id:string ,thunkAPI) => {
		try {	            
      let isItem = {
        id:'',
        component_id:component_id,
        title:'Title',        
        contents: '간단한 내용이 들어갑니다',
        insert_dt: Number(new Date()),
        image_url:'image/man_default_image.png',
        item_url:'https://www.google.com/search?q=default+props&oq=default+props&aqs=chrome..69i57.2583j0j7&sourceid=chrome&ie=UTF-8',        
      }
      await addDoc(collection(db,'item'),{...isItem})
      .then(async(isdoc)=>{
        isItem = {...isItem , id: isdoc.id}
        const updateRef = doc(db,'item',isdoc.id);		
        await updateDoc(updateRef, {id:isdoc.id});	        
        const itemInfo = {isItem,component_id}
        thunkAPI.dispatch(addItemDone(itemInfo))    
      })     
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);			 
		}
	}
);

export const item = createSlice({
	name: 'item',
	initialState,
	reducers: {
		setItem: (state, action) => {                     
      state.list = {...state.list, ...action.payload};
      state.is_loading = false;
      console.log(state)
		},
    addItemDone:(state, action)=> {
      state.list[action.payload.component_id].push(action.payload.isItem)             
      state.is_loading = false;
    },
		loading: (state) => {
		 state.is_loading = true;
		},
	},
	extraReducers: (builder) => {			
	},
	},
);

export const { setItem,addItemDone,loading } = item.actions;
export default item.reducer;
