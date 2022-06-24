import { Grid, Text, Button } from '../elements/index';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { logout, logoutDB } from '../store/modules/user';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

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
				<HeaderBox>
					<Grid is_flex padding='0px 16px'>
						<Grid is_flex>
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

						<Grid is_flex padding='0px 5px' width='20%'>
							<Button
								text='내정보'
								margin='0px 5px 0px 0px'
								callback={() => {}}
							/>
							<Button
								text='로그아웃'
								callback={() => {
									logoutDB();
									navigate('/login');
								}}
							/>
						</Grid>
					</Grid>
				</HeaderBox>
				<HeaderPlaceHolder />
			</>
		);
	}

	return (
		<>
			<HeaderBox>
				<Grid is_flex>
					<Grid is_flex>
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

					<Grid is_flex padding='5px' width='20%'>
						<Button
							text='로그인'
							margin='0px 5px 0px 0px'
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
			</HeaderBox>
			<HeaderPlaceHolder />
		</>
	);
};

export default Header;

const HeaderBox = styled.div`
	position: fixed;
	top: 0;
	height: 61px;
	width: 100%;
	z-index: 9999;
	border: 1px solid black;
`;
const HeaderPlaceHolder = styled.div`
	height: 61px;
	margin: 0px;
`;
