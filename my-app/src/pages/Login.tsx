import { Text, Input, Grid, Button } from '../elements/index';

const Login = () => {
	return (
		<>
			<Grid padding='16px 16px'>
				<Text size='32px' bold>
					로그인
				</Text>
				<Grid padding='16px 0px'>
					<Input label='아이디' placeholder='아이디를 입력하세요' />
					<Input label='패스워드' placeholder='패스워드를 입력하세요' />
				</Grid>
				<Button
					text='버튼'
					callback={() => {
						console.log('Login Click!');
					}}
				/>
			</Grid>
		</>
	);
};

export default Login;
