import { Grid, Text, Button } from '../elements/index';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { logout, logoutDB } from '../store/modules/user';
import { useDispatch } from 'react-redux';

type HeaderProps = {
	_isLogin?: boolean | undefined;
};

const Header = (props: HeaderProps) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		if (props._isLogin) {
			setIsLogin(true);
		} else {
			setIsLogin(false);
		}
	}, [props._isLogin]);

	if (isLogin) {
		return (
			<>
				<Grid is_flex padding='16px'>
					<Grid>
						<Text
							size='24px'
							margin='0px 10px'
							bold
							callback={() => {
								navigate('/');
							}}
						>
							Ref everything
						</Text>
					</Grid>

					<Grid is_flex width='50%'>
						<Button text='내정보' callback={() => {}} />
						<Button
							text='로그아웃'
							callback={() => {
								logoutDB();
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
						margin='0px 10px'
						bold
						callback={() => {
							navigate('/');
						}}
					>
						Ref everything
					</Text>
				</Grid>
				{isLogin ? (
					<Grid is_flex width='50%'>
						<Button text='내정보' callback={() => {}} />
						<Button
							text='로그아웃'
							callback={() => {
								logoutDB();
								navigate('/login');
							}}
						/>
					</Grid>
				) : (
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
				)}
			</Grid>
		</>
	);
};

export default Header;
