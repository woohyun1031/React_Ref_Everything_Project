import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import ModalCloseButton from './ModalCloseButton';

const AddItem = () => {
	const [input, setInput] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const onAddClick = async () => {
		if (window.confirm('Add?')) {
			console.log('isaddclick');
		}
	};

	const hendleCheckEnter = (e: KeyboardEvent<HTMLFormElement>) => {
		if (e.key === 'Enter') {
			onAddClick();
		}
	};

	return (
		<Form onKeyPress={hendleCheckEnter}>
			<ModalCloseButton />
			<FormTitle>Add Item</FormTitle>
			<FormDescription>
				Add버튼을 누르시면 <br /> Add가 완료됩니다
			</FormDescription>
			<Label htmlFor='text'>Add</Label>
			<Input type='text' id='text' onChange={handleChange} />
			<Button onClick={() => onAddClick}>Add</Button>
		</Form>
	);
};

export default AddItem;

const Form = styled.form`
	width: 460px;
	height: 360px;
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

const Label = styled.label``;

const Input = styled.input`
	width: 265px;
	height: 38px;
	border-radius: 7px;
	padding: 12px;
	background-color: #718aff;
	margin-top: 10px;
	margin-bottom: 20px;
`;

const Button = styled.button`
	width: 265px;
	height: 38px;
	border-radius: 7px;
	background-color: #718aff;
	/* &:hover {
		background-color: #9CAEFF;
	}
	&:active {
		background-color:#4F66D2;
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
