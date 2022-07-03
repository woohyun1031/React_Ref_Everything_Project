import { createAsyncThunk, createSlice,} from '@reduxjs/toolkit';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../shared/firebase';

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
      thunkAPI.dispatch(setItem(new_list))      
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);			 
		}
	}
);

export const addItem = createAsyncThunk(
	'component/addItem',
	async (postInfo:{title:string,contents:string,address:string,postId:string} ,thunkAPI) => {
		try {
      const component_id = postInfo.postId;        
      let isItem = {
        id:'',
        component_id:component_id,
        title:postInfo.title,        
        contents: postInfo.contents,
        insert_dt: Number(new Date()),
        image_url:`http://www.google.com/s2/favicons?domain=${postInfo.address}`,
        item_url:postInfo.address,        
      }
      await addDoc(collection(db,'item'),{...isItem})
      .then(async(isdoc)=>{
        isItem = {...isItem , id: isdoc.id}
        const updateRef = doc(db,'item',isdoc.id);		
        await updateDoc(updateRef, {id:isdoc.id});	                
        const itemInfo = {isItem, component_id};        
        thunkAPI.dispatch(addItemDone(itemInfo));           
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
