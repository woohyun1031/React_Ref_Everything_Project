import { ChangeEvent, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../store/configStore';
import { addComponent } from '../store/modules/component';
import { closeModal } from '../store/modules/modal';

const AddComponent = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [inputs, setInputs] = useState({ icon: '', title: '' });

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	const onAddClick = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const isTitle = inputs.title.trim();
		if (isTitle === '') {
			return alert('빈 칸을 모두 채우세요');
		} else {
			await dispatch(addComponent(isTitle));
			dispatch(closeModal());
		}
	};

	return (
		<Form>
			<FormTitle>Add Component</FormTitle>
			<FormDescription>
				Add버튼을 누르시면 <br /> Component가 Add 됩니다
			</FormDescription>
			<InputBox>
				<Label htmlFor='title'>title</Label>
				<Input type='text' name='title' onChange={handleChange} />
			</InputBox>
			<Button onClick={onAddClick}>Add</Button>
		</Form>
	);
};

export default AddComponent;

const Form = styled.form`
	width: 460px;
	height: 370px;
	font-size: 12px;
	padding: 60px 100px;
	color: ${({ theme }) => theme.colors.title};
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
	background-color: ${({ theme }) => theme.colors.background};
	margin-top: 5px;
	margin-bottom: 15px;
	border: 1px solid ${({ theme }) => theme.colors.modal_border};
	color: ${({ theme }) => theme.colors.title};
`;

const IconInput = styled.input`
	width: 43px;
	height: 30px;
	border-radius: 7px;
	padding: 12px;
	background-color: ${({ theme }) => theme.colors.background};
	margin-top: 5px;
	margin-bottom: 15px;
	border: 1px solid ${({ theme }) => theme.colors.modal_border};
	color: ${({ theme }) => theme.colors.title};
`;

const Button = styled.button`
	width: 265px;
	height: 38px;
	border-radius: 7px;
	background-color: ${({ theme }) => theme.colors.modal_button_background};
	color: ${({ theme }) => theme.colors.modal_button_title};
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
