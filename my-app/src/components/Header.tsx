import { Grid, Text, Button } from '../elements/index';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { logoutDB } from '../store/modules/user';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../store/configStore';
import DropDown from './DropDownMenu';

type HeaderProps = {
	_isLogin?: boolean | undefined;
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

	return (
		<>
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

					<Grid is_flex padding='0px 5px' width='15%' bg>
						<DropDown name={userName} isLogin={isLogin} />
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
	border: 1px solid #e9e9e9;
`;
const HeaderPlaceHolder = styled.div`
	height: 61px;
	margin: 0px;
`;
