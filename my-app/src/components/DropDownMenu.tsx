import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch } from '../store/configStore';
import { openModal } from '../store/modules/modal';
import { Grid, Text, Button } from '../elements/index';
import { logoutDB } from '../store/modules/user';

type DropDownProps = {
	name?: string;
	isLogin?: boolean;
};

const DropDown = (props: DropDownProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropDown = () => {
		setIsOpen((prevState) => !prevState);
	};

	const onLogout = async () => {
		await dispatch(logoutDB());
		setIsOpen((prevState) => !prevState);
		navigate('/login');
	};

	const onLogin = () => {
		navigate('/login');
	};

	const onSignUp = () => {
		navigate('/signup');
	};

	return (
		<>
			{props.isLogin ? (
				<Container>
					<Name onClick={toggleDropDown}>
						{props.name} 님
						<ArrowIcon
							src={isOpen ? '/images/arrowUp.png' : '/images/arrowDown.png'}
						/>
					</Name>
					{isOpen && (
						<>
							<BackGround onClick={toggleDropDown} />
							<Menu>
								<li>마이페이지</li>
								<li onClick={onLogout}>로그아웃</li>
							</Menu>
						</>
					)}
				</Container>
			) : (
				<Grid is_flex padding='5px' width='100%' bg>
					<Button
						text='로그인'
						margin='0px 5px 0px 0px'
						callback={onLogin}
						font_color='black'
					/>
					<Button text='회원가입' font_color='black' callback={onSignUp} />
				</Grid>
			)}
		</>
	);
};

export default DropDown;

const Container = styled.div`
	position: relative;
`;

const Name = styled.button`
	color: ${({ theme }) => theme.colors.title};
	font-size: 14px;
	font-weight: 600;
	position: relative;
	z-index: 101;
	padding: 10px;
`;

const ArrowIcon = styled.div<{ src: string }>`
	display: inline-block;
	width: 14px;
	height: 8px;
	margin-left: 5px;
	background-image: url(${({ src }) => src});
	background-position: center center;
	background-repeat: no-repeat;
`;

const Menu = styled.ul`
	width: 108px;
	height: 65px;
	border-radius: 7px;
	padding: 5px;
	font-size: 13px;
	font-weight: 400;
	bottom: -60px;
	left: 5px;
	background-color: ${({ theme }) => theme.colors.background};
	box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
	background-position: center center;
	background-repeat: no-repeat;
	& li {
		color: ${({ theme }) => theme.colors.title};
		width: 70px;
		text-align: center;
		margin: 0px auto 3px auto;
		cursor: pointer;
		padding: 4px 0;
	}
	& li:nth-child(2) {
		color: ${({ theme }) => theme.colors.reject};
		border-top: 1px solid ${({ theme }) => theme.colors.subTitle};
	}
	position: absolute;
	z-index: 101;
`;

const BackGround = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	${({ theme }) => theme.commons.blur_background};
	z-index: 100;
`;
