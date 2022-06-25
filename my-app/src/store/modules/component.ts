import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
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
};

const initialState: initialStateType = {
	list: [],	
  is_loading: false,
};

const userDefaultImgae = 'images/man_default_image.png';
const ItemDefaultUrl = 'https://www.google.com/search?q=default+props&oq=default+props&aqs=chrome..69i57.2583j0j7&sourceid=chrome&ie=UTF-8'

const initialComponent : ComponentType= {
	  id:'0',
    component_title:'😀initialComponent Title', 
    user_id:'initial user id'
};

export const getComponent = createAsyncThunk(
	'component/getComponent',
	async (_,thunkAPI) => {
		try {	      
      const _user = thunkAPI.getState() as RootState;
			let post_query = query(
				collection(db,'component'),
				where('user_id','==', _user.user.user.user_uid),								
			)	
			const componentDB = await getDocs(post_query);
      let componentList: ComponentType[] = [];
      console.log(componentDB)
      componentDB.forEach((component) => {
				let _component = component.data();
				let new_component = Object.keys(_component).reduce((acc, cur) => {
					return {...acc, [cur]: _component[cur]}
				},{id: component.id})
				componentList.push(new_component);
			})
      console.log(componentList)
      thunkAPI.dispatch(setComponents(componentList)); 
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
      if(action.payload){
        state.list = action.payload
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

export const { setComponents,loading, } = component.actions;
export default component.reducer;
