import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Text, Input, Grid, Button } from '../elements/index';
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
		console.log(inputs);
	};

	const onSignUp = () => {
		const { email, password } = inputs;
		const userInfo = { email, password };
		dispatch(signUp(userInfo));
	};

	return (
		<>
			<Grid padding='16px'>
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
						placeholder='비밀번호를 입력해주세요.'
						callback={onChange}
					/>
				</Grid>

				<Grid padding='16px 0px'>
					<Input
						name='confirmPassword'
						label='비밀번호 확인'
						placeholder='비밀번호를 다시 입력해주세요.'
						callback={onChange}
					/>
				</Grid>

				<Button text='회원가입하기' callback={onSignUp}></Button>
			</Grid>
		</>
	);
};

export default SignUp;
