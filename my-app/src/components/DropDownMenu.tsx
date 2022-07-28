import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch } from '../store/configStore';
import { Grid, Button } from '../elements/index';
import { changeTheme, logoutDB, openSidebar } from '../store/modules/user';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { openModal } from '../store/modules/modal';

type DropDownProps = {
	name?: string;
	isLogin?: boolean;
	isDark: boolean;
};

const DropDown = (props: DropDownProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [isStatic, setIsStatic] = useState(true);

	useEffect(() => {
		if (!isStatic) {
			setTimeout(() => {
				setIsOpen(false);
				setIsStatic(true);
			}, 200);
		}
	}, [isStatic]);

	const toggleDropDown = (isOpen: boolean) => {
		setIsOpen(isOpen);
	};

	const onLogout = async () => {
		dispatch(changeTheme(false));
		dispatch(openSidebar(false));
		await dispatch(logoutDB());
		setIsOpen(false);
		navigate('/login');
	};

	const onLogin = () => {
		navigate('/login');
	};

	const onSignUp = () => {
		navigate('/signup');
	};

	const openMyPage = () => {
		dispatch(openModal('myPage'));
	};

	return (
		<>
			{props.isLogin ? (
				<Container>
					<UpperWrap
						onMouseOver={() => toggleDropDown(true)}
						onMouseLeave={() => setIsStatic(false)}
					>
						<NameWrap>
							<Name>{props.name} 님</Name>
							<Icon isDark={props.isDark}>
								{isOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
							</Icon>
						</NameWrap>

						<Menu isOpen={isOpen} isStatic={isStatic}>
							<li onClick={openMyPage}>마이페이지</li>
							<li onClick={onLogout}>로그아웃</li>
						</Menu>
					</UpperWrap>
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
const UpperWrap = styled.div``;

const NameWrap = styled.div`
	display: flex;
`;

const Name = styled.button`
	color: ${({ theme }) => theme.colors.title};
	font-size: 14px;
	font-weight: 600;
	position: relative;
	z-index: 99;
	padding: 10px;
`;

const Icon = styled.div<{ isDark: boolean }>`
	display: flex;
	align-items: center;
	transition: 0.3s;
	color: ${({ isDark }) => (isDark ? 'white' : '')};
	cursor: pointer;
`;

const Menu = styled.ul<{ isOpen: boolean; isStatic: boolean }>`
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

	animation-duration: 0.2s;
	animation-timing-function: ease-out;
	animation-fill-mode: forwards;
	${({ isStatic }) =>
		isStatic ? 'animation-name: slideUp' : 'animation-name: slideDown'};

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0px);
		}
	}
	@keyframes slideDown {
		from {
			opacity: 1;
			transform: translateY(0px);
		}
		to {
			opacity: 0;
			transform: translateY(-10px);
		}
	}
	${({ isOpen }) => !isOpen && 'display:none'};
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
