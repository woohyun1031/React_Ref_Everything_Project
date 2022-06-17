import { Grid, Text, Button } from '../elements/index';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { logout } from '../store/modules/user';
import { useDispatch } from 'react-redux';

type HeaderProps = {
	_isToken?: boolean | undefined;
};

const Header = (props: HeaderProps) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		if (props._isToken) {
			setIsLogin(true);
		} else {
			setIsLogin(false);
		}
	}, [props._isToken]);

	if (isLogin) {
		return (
			<>
				<Grid is_flex>
					<Grid>
						<Text
							size='24px'
							bold
							callback={() => {
								navigate('/');
							}}
						>
							안녕하세요
						</Text>
					</Grid>

					<Grid is_flex width='50%'>
						<Button text='내정보' callback={() => {}} />
						<Button text='알림' callback={() => {}} />
						<Button
							text='로그아웃'
							callback={() => {
								dispatch(logout());
								navigate('/login');
							}}
						/>
					</Grid>
				</Grid>
			</>
		);
	}

	return (
		<>
			<Grid is_flex>
				<Grid>
					<Text
						size='24px'
						bold
						callback={() => {
							navigate('/');
						}}
					>
						안녕하세요
					</Text>
				</Grid>

				<Grid is_flex width='50%'>
					<Button
						text='로그인'
						callback={() => {
							navigate('/login');
						}}
					/>
					<Button
						text='회원가입'
						callback={() => {
							navigate('/signup');
						}}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default Header;
