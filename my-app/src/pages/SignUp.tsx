import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Text, Input, Grid, Button } from '../elements/index';
import { emailCheck } from '../shared/common';
import { AppDispatch } from '../store/configStore';
import { signUp } from '../store/modules/user';

const SignUp = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigator = useNavigate();

	const [inputs, setInputs] = useState({
		email: '',
		nickName: '',
		password: '',
		confirmPassword: '',
	});

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	const onSignUp = () => {
		const { email, password, nickName, confirmPassword } = inputs;
		const userInfo = { email, password, nickName };
		const checkEmail = emailCheck(email);
		if (email === '' || password === '') {
			return alert('email 혹은 password가 비어있습니다!');
		} else if (!checkEmail) {
			return alert('email이 형식이 맞지 않습니다!');
		} else if (password !== confirmPassword) {
			return alert('비밀번호가 다릅니다');
		} else {
			dispatch(signUp(userInfo));
		}
	};

	return (
		<>
			<HeaderPlaceHolder />
			<SignUpWrap>
				<Grid padding='16px' width='50%'>
					<Text size='32px' bold>
						회원가입
					</Text>

					<Grid padding='16px 0px'>
						<Input
							name='email'
							label='이메일'
							placeholder='이메일을 입력해주세요.'
							callback={onChange}
						/>
					</Grid>

					<Grid padding='16px 0px'>
						<Input
							type='text'
							name='nickName'
							label='닉네임'
							placeholder='닉네임을 입력해주세요.'
							callback={onChange}
						/>
					</Grid>

					<Grid padding='16px 0px'>
						<Input
							name='password'
							label='비밀번호'
							type='password'
							placeholder='비밀번호를 입력해주세요.'
							callback={onChange}
						/>
					</Grid>

					<Grid padding='16px 0px'>
						<Input
							name='confirmPassword'
							label='비밀번호 확인'
							type='password'
							placeholder='비밀번호를 다시 입력해주세요.'
							callback={onChange}
						/>
					</Grid>

					<Button text='회원가입하기' callback={onSignUp}></Button>
				</Grid>
			</SignUpWrap>
		</>
	);
};

export default SignUp;

const HeaderPlaceHolder = styled.div`
	height: 61px;
	margin: 0px;
`;

const SignUpWrap = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 100px;
`;
