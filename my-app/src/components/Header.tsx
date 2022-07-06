import { Grid, Text, Button } from '../elements/index';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../store/configStore';
import DropDown from './DropDownMenu';
import { changeTheme } from '../store/modules/user';

type HeaderProps = {
	_isLogin?: boolean | undefined;
	_isDark: boolean;
};

const Header = (props: HeaderProps) => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [isLogin, setIsLogin] = useState(false);
	const userName = useSelector((state: RootState) => state.user.user.user_name);

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

	return (
		<HeaderBox>
			<Grid is_flex bg>
				<Grid is_flex bg>
					<Text
						size='24px'
						margin='0px 26px'
						bold
						callback={() => {
							navigate('/');
						}}
					>
						Ref everything
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
							<Icon isDark={props._isDark}>
								{props._isDark ? <BsFillMoonFill /> : <BsFillSunFill />}
							</Icon>
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

const IconWrap = styled.div`
	overflow: hidden;
	cursor: pointer;
`;
const Icon = styled.div<{ isDark: boolean }>`
	transition: 0.3s;
	color: ${({ isDark }) => (isDark ? 'white' : '')};
	cursor: pointer;
	${IconWrap}:active & {
		transform: translateY(-30px);
	}
`;
