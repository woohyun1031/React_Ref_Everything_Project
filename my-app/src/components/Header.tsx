import { Grid, Text, Button } from '../elements/index';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../store/configStore';
import DropDown from './DropDownMenu';
import { changeTheme, menuHover, openSidebar } from '../store/modules/user';
import { RiMenuFoldFill, RiMenuLine } from 'react-icons/ri';
import { MdBookmark } from 'react-icons/md';

type HeaderProps = {
	_isLogin?: boolean | undefined;
	_isDark: boolean;
};

const Header = (props: HeaderProps) => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [isLogin, setIsLogin] = useState(false);
	const userName = useSelector((state: RootState) => state.user.user.user_name);
	const _isOpen = useSelector((state: RootState) => state.user.isOpen);
	const _isHover = useSelector((state: RootState) => state.user.isHover);

	useEffect(() => {
		if (props._isLogin) {
			setIsLogin(true);
		} else {
			setIsLogin(false);
		}
	}, [props._isLogin]);

	const toggleDarkMode = () => {
		dispatch(changeTheme(!props._isDark));
	};

	const toggleSideOpen = () => {
		dispatch(menuHover(false));
		dispatch(openSidebar(!_isOpen));
	};

	return (
		<HeaderBox>
			<Grid is_flex bg>
				<Grid is_flex bg>
					{isLogin ? (
						<MenuIcon isOpen={_isOpen} isDark={props._isDark}>
							{_isOpen ? (
								<RiMenuFoldFill onClick={toggleSideOpen} />
							) : (
								<RiMenuLine
									onClick={toggleSideOpen}
									onMouseOver={() => {
										if (!_isOpen) dispatch(menuHover(!_isHover));
									}}
									onMouseOut={() => {
										if (!_isOpen) dispatch(menuHover(!_isHover));
									}}
								/>
							)}
						</MenuIcon>
					) : null}
					<Text size='24px' margin='0px 0px 0px 26px' bold>
						Ref everything
					</Text>
					<Text size='24px' margin='0px 0px' bold>
						<MdBookmark />
					</Text>
				</Grid>

				<Grid
					is_flex
					padding='0px 5px'
					width='150px'
					bg
					margin='0px 15px 0px 0px'
				>
					<IconWrap onClick={() => toggleDarkMode()}>
						{isLogin && (
							<ModeIcon isDark={props._isDark}>
								{props._isDark ? <BsFillMoonFill /> : <BsFillSunFill />}
							</ModeIcon>
						)}
					</IconWrap>
					<DropDown name={userName} isLogin={isLogin} isDark={props._isDark} />
				</Grid>
			</Grid>
		</HeaderBox>
	);
};

export default Header;

const HeaderBox = styled.div`
	position: fixed;
	top: 0;
	height: 61px;
	width: 100%;
	z-index: 9999;
	border-bottom: 1px solid ${({ theme }) => theme.colors.header_border};
`;
const MenuIcon = styled.div<{ isOpen: boolean; isDark: boolean }>`
	margin-left: 20px;
	cursor: pointer;
	color: ${({ isDark }) => (isDark ? 'white' : '')};
	transition: 0.5s;
	${({ isOpen }) => (isOpen ? 'transform:translateX(3px)' : '')};
	:hover {
		transform: translateX(3px);
	}
`;

const IconWrap = styled.div`
	overflow: hidden;
	cursor: pointer;
`;
const ModeIcon = styled.div<{ isDark: boolean }>`
	transition: 0.3s;
	color: ${({ isDark }) => (isDark ? 'white' : '')};
	cursor: pointer;
	${IconWrap}:active & {
		transform: translateY(-30px);
	}
`;
