import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
	type: '',
	postId: '',
};
	
const ModalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal(state, action: PayloadAction<'addItem'|'addComponent'>) {
			state.isOpen = true;
			state.type = action.payload;
		},
		closeModal(state) {
			state.isOpen = false;
		},
		changePostId(state, action: PayloadAction<string>) {
			state.postId = action.payload;
		},
	},
});

export const { openModal, closeModal, changePostId } = ModalSlice.actions;

export default ModalSlice.reducer;
