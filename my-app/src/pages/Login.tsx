import { useState, ChangeEvent } from 'react';
import { getCookie, setCookie, deleteCookie } from '../Cookie';
import { Text, Input, Grid, Button } from '../elements/index';

const Login = () => {
	const [isId, setIsId] = useState('');
	const [isPw, setIsPw] = useState('');

	const changeId = (e: ChangeEvent<HTMLInputElement>) => {
		setIsId(e.target.value);
	};
	const changePw = (e: ChangeEvent<HTMLInputElement>) => {
		setIsPw(e.target.value);
	};

	const login = () => {
		setCookie('userId', isId);
		setCookie('userPw', isPw);
	};

	return (
		<>
			<Grid padding='16px 16px'>
				<Text size='32px' bold>
					로그인
				</Text>
				<Grid padding='16px 0px'>
					<Input
						value={isId}
						callback={changeId}
						label='아이디'
						placeholder='아이디를 입력하세요'
					/>
					<Input
						value={isPw}
						callback={changePw}
						type='password'
						label='패스워드'
						placeholder='패스워드를 입력하세요'
					/>
				</Grid>
				<Button text='버튼' callback={login} />
			</Grid>
		</>
	);
};

export default Login;
