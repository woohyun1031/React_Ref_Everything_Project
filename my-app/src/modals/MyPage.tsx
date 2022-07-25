import { ChangeEvent, MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Text } from '../elements/index';
import { AppDispatch, RootState } from '../store/configStore';
import { addComponent, removeComponent } from '../store/modules/component';
import { closeModal } from '../store/modules/modal';
import ModalCloseButton from './ModalCloseButton';

const MyPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [input, setInput] = useState('');
	const component_list = useSelector(
		(state: RootState) => state.component.list
	);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const componentRemove = (componentId: string) => {
		if (confirm('정말로 삭제하시겠습니까?'))
			dispatch(removeComponent(componentId));
	};

	return (
		<Form>
			<FormTitle>My Page</FormTitle>
			<FormDescription>
				My Page 입니다. <br /> Component list 및 개인 정보를 수정하세요.
			</FormDescription>
			<InputBox>
				<Label htmlFor='nickname'>nickname</Label>
				<Input type='text' name='nickname' onChange={handleChange} />
				<Label>component list</Label>
				<ComponentList>
					{component_list ? (
						component_list.map((component) => {
							return (
								<Component
									key={component.id}
									onClick={() => componentRemove(component.id)}
								>
									<Text size='9px' bold color='side_title'>
										{component.component_title}
									</Text>
									<ModalCloseButton
										top='8px'
										right='5px'
										callback={(e: MouseEvent) => {
											e.preventDefault();
										}}
									/>
								</Component>
							);
						})
					) : (
						<Component>component가 존재하지 않습니다</Component>
					)}
				</ComponentList>
			</InputBox>
		</Form>
	);
};

export default MyPage;

const Form = styled.form`
	width: 460px;
	height: 400px;
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
	width: 70%;
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

const ComponentList = styled.div`
	width: 100%;
	height: 100px;
	background-color: ${({ theme }) => theme.colors.background};
	border: 1px solid ${({ theme }) => theme.colors.modal_border};
	margin-top: 5px;
	overflow-y: auto;
`;

const Component = styled.li`
	color: ${({ theme }) => theme.colors.side_title};
	padding: 8px 16px;
	cursor: pointer;
	:hover {
		transform: translateY(-2px);
		filter: drop-shadow(3px 4px 7px rgba(0, 0, 0, 0.3));
	}
	display: flex;
	justify-content: space-between;
	position: relative;
`;
