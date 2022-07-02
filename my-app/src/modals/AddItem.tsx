import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../store/configStore';
import { addItem } from '../store/modules/item';
import { closeModal } from '../store/modules/modal';
import ModalCloseButton from './ModalCloseButton';

const AddItem = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [inputs, setInputs] = useState({
		title: '',
		contents: '',
		address: '',
	});
	const postId = useSelector((state: RootState) => state.modal);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	const onAddClick = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log('isaddclick', postId, inputs);
		const postInfo = { ...inputs, postId: postId.postId };
		if (
			inputs.address === '' ||
			inputs.contents === '' ||
			inputs.title === ''
		) {
			return alert('빈 칸을 모두 채우세요');
		} else {
			await dispatch(addItem(postInfo));
			dispatch(closeModal());
		}
	};

	return (
		<Form>
			<ModalCloseButton />
			<FormTitle>Add Item</FormTitle>
			<FormDescription>
				Add버튼을 누르시면 <br /> Item이 Add 됩니다
			</FormDescription>
			<InputBox>
				<Label htmlFor='address'>address</Label>
				<Input type='text' name='address' onChange={handleChange} />
				<Label htmlFor='title'>title</Label>
				<Input type='text' name='title' onChange={handleChange} />
				<Label htmlFor='contents'>contents</Label>
				<Input type='text' name='contents' onChange={handleChange} />
			</InputBox>
			<Button onClick={onAddClick}>Add</Button>
		</Form>
	);
};

export default AddItem;

const Form = styled.form`
	width: 460px;
	height: 510px;
	font-size: 12px;
	padding: 60px 100px;
	color: #000000;
`;

const FormTitle = styled.h2`
	font-size: 22px;
	font-weight: bold;
`;

const FormDescription = styled.p`
	margin-top: 10px;
	margin-bottom: 30px;
`;

const InputBox = styled.div`
	margin-bottom: 20px;
`;

const Label = styled.label``;

const Input = styled.input`
	width: 265px;
	height: 30px;
	border-radius: 7px;
	padding: 12px;
	background-color: #ffffff;
	margin-top: 5px;
	margin-bottom: 15px;
	border: 1px solid gray;
`;

const Button = styled.button`
	width: 265px;
	height: 38px;
	border-radius: 7px;
	background-color: #718aff;
	/* &:hover {
		background-color: #9caeff;
	}
	&:active {
		background-color: #4f66d2;
	} */
	color: #ffffff;
	font-weight: bold;
	margin-bottom: 10px;
	transition: 0.3s;
	&:hover {
		filter: brightness(105%);
	}
	&:active {
		filter: brightness(95%);
	}
`;
