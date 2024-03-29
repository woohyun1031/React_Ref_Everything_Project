import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	addDoc,
	collection,
	doc,
	getDocs,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import { ItemType } from '../../components/RefItem';
import { db } from '../../shared/firebase';
import { RootState } from '../configStore';

//initialState
type initialStateType = {
	list: any;
	is_loading: boolean;
};

const initialState: initialStateType = {
	list: {},
	is_loading: false,
};

export const getItem = createAsyncThunk(
	'item/getItem',
	async (component_id: string, thunkAPI) => {
		try {
			const item_query = collection(db, 'component', component_id, 'item');
			const itemDB = await getDocs(item_query);
			const itemList: any = []; //[{},{},{}]
			itemDB.forEach((item) => {
				itemList.push({ ...item.data(), id: item.id });
			});
			const new_list = { [component_id]: itemList };
			thunkAPI.dispatch(setItem(new_list));
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);
		}
	}
);

export const addItem = createAsyncThunk(
	'item/addItem',
	async (
		postInfo: {
			title: string;
			contents: string;
			address: string;
			postId: string;
		},
		thunkAPI
	) => {
		try {
			const component_id = postInfo.postId;
			let isItem = {
				id: '',
				component_id: component_id,
				title: postInfo.title,
				contents: postInfo.contents,
				insert_dt: Number(new Date()),
				image_url: `http://www.google.com/s2/favicons?domain=${postInfo.address}`,
				item_url: postInfo.address,
			};
			await addDoc(collection(db, 'component', component_id, 'item'), {
				...isItem,
			}).then(async (isdoc) => {
				isItem = { ...isItem, id: isdoc.id };
				const updateRef = doc(db, 'component', component_id, 'item', isdoc.id);
				await updateDoc(updateRef, { id: isdoc.id });
				const itemInfo = { isItem, component_id };
				thunkAPI.dispatch(addItemDone(itemInfo));
			});
		} catch (error) {
			alert(`알 수 없는 오류: ${error}`);
		}
	}
);

export const removeItem = createAsyncThunk(
	'item/removeItem',
	async (postInfo: { id: string; component_id: string }, thunkAPI) => {
		const _user = thunkAPI.getState() as RootState;
		try {
			await deleteDoc(
				doc(db, 'component', postInfo.component_id, 'item', postInfo.id)
			);
			const new_list = {
				[postInfo.component_id]: _user.item.list[postInfo.component_id].filter(
					(item: ItemType) => {
						if (item.id !== postInfo.id) {
							return item;
						} else {
							return;
						}
					}
				),
			};
			thunkAPI.dispatch(setItem(new_list));
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
			state.list = { ...state.list, ...action.payload };
			state.is_loading = false;
		},
		addItemDone: (state, action) => {
			state.list[action.payload.component_id].push(action.payload.isItem);
			state.is_loading = false;
		},
		loading: (state) => {
			state.is_loading = true;
		},
	},
});

export const { setItem, addItemDone, loading } = item.actions;
export default item.reducer;
