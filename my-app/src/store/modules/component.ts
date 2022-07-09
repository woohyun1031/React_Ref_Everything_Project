import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../shared/firebase';
import { RootState } from '../configStore';

type ComponentType = {
  id?: string;
  component_title?:string;
  user_id?: string;  
};

//initialState
type initialStateType = {
	list: ComponentType[];	
	is_loading:boolean;
	is_location:string;
};

const initialState: initialStateType = {
	list: [],	
  is_loading: false,
	is_location:'',
};

export const getComponent = createAsyncThunk(
	'component/getComponent',
	async (_,thunkAPI) => {
		try {	      
      const _user = thunkAPI.getState() as RootState;
			const user_id = _user.user.user.user_uid;			
			const componentList: ComponentType[] = [];

			const post_query = query(
				collection(db,'component'),
				where('user_id','==', user_id),								
			)

			const componentDB = await getDocs(post_query);

      componentDB.forEach((component) => {
				const _component = component.data();
				const new_component = Object.keys(_component).reduce((acc, cur) => {
					return {...acc, [cur]: _component[cur]}
				},{id: component.id})
				componentList.push(new_component);
			})

      thunkAPI.dispatch(setComponents(componentList)); 
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);			 
		}
	}
);

export const addComponent = createAsyncThunk(
	'component/addComponent',
	async (title:string,thunkAPI) => {
		try {	            
			const _user = thunkAPI.getState() as RootState;
			const user_id = _user.user.user.user_uid;		

      let isComponent = {
        id:'',
   			component_title:title, 
   			user_id:user_id
      }
      await addDoc(collection(db,'component'),{...isComponent})
      .then(async(isdoc)=>{
        isComponent = {...isComponent , id: isdoc.id}
        const updateRef = doc(db,'component',isdoc.id);		
        await updateDoc(updateRef, {id:isdoc.id});	                
        thunkAPI.dispatch(addComponentDone(isComponent))    
      })     
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);			 
		}
	}
);

export const component = createSlice({
	name: 'component',
	initialState,
	reducers: {
		setComponents: (state, action) => {			      
			state.list = action.payload					
			state.is_loading = false;
		},
		addComponentDone: (state,action) => {
			state.list.push(action.payload)
			state.is_loading = false;
		},		
		loading: (state) => {
		 state.is_loading = true;
		},
		changeComponentId:(state,action) => {
			state.is_location = action.payload
		}
	},	
	},
);

export const { setComponents,addComponentDone,loading,changeComponentId } = component.actions;
export default component.reducer;
