import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
	type: '',
	classId: '',
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
	},
});

export const { openModal, closeModal, } = ModalSlice.actions;

export default ModalSlice.reducer;
