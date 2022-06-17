import { useState, ChangeEvent } from 'react';
import { Text, Input, Grid, Button } from '../elements/index';
import { useDispatch } from 'react-redux';
import { signIn } from '../store/modules/user';
import { AppDispatch } from '../store/configStore';
import { emailCheck } from '../shared/common';

const Login = () => {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});
	const dispatch = useDispatch<AppDispatch>();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	const onlogin = () => {
		const { email, password } = inputs;
		const checkEmail = emailCheck(email);

		if (email === '' || password === '') {
			return alert('email 혹은 password가 비어있습니다!');
		} else if (!checkEmail) {
			return alert('email이 형식이 맞지 않습니다!');
		}
		const userInfo = { email, password };
		dispatch(signIn(userInfo));
	};

	return (
		<>
			<Grid padding='16px 16px'>
				<Text size='32px' bold>
					로그인
				</Text>
				<Grid padding='16px 0px'>
					<Input
						name='email'
						callback={onChange}
						label='아이디'
						placeholder='아이디를 입력하세요'
					/>
					<Input
						name='password'
						type='password'
						callback={onChange}
						label='패스워드'
						placeholder='패스워드를 입력하세요'
					/>
				</Grid>
				<Button text='로그인' callback={onlogin} />
			</Grid>
		</>
	);
};

export default Login;
