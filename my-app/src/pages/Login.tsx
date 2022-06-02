import { useState, ChangeEvent } from 'react';
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

	const getCookie = (name: string) => {
		let value = '; ' + document.cookie;
		let parts = value.split('; ' + name + '=');
		if (parts.length === 2) {
			return console.log(parts.pop()?.split(';').shift());
		}
		console.log('getcookie!!');
	};

	const setCookie = (name: string, value: string, exp = 5) => {
		let date = new Date();
		date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
		document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
		console.log('setcookie!!');
	};

	const deleteCookie = (name: string) => {
		document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
		console.log('deletecookie!!');
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
				<Button
					text='버튼'
					callback={() => {
						setCookie('userId', isId, 3);
						setCookie('userPw', isPw, 3);
					}}
				/>
				<Button
					text='get cookie버튼'
					callback={() => {
						getCookie('userId');
						getCookie('userPw');
					}}
				/>
			</Grid>
		</>
	);
};

export default Login;
