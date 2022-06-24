import { Grid, Text, Button } from '../elements/index';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { logout, logoutDB } from '../store/modules/user';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

type SideProps = {
	_isLogin?: boolean | undefined;
};

const SideBar = (props: SideProps) => {
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

	return (
		<>
			<SideBarWrap>
				<SideUlist>
					<SideList>🧇 sidebar</SideList>
					<SideList>🤬 sidebar</SideList>
					<SideList>👾 sidebar</SideList>
					<SideList>🏜 sidebar</SideList>
					<SideList>😀 sidebar</SideList>
					<SideList>😀 sidebar</SideList>
					<AddSideList>+ 추가하기</AddSideList>
				</SideUlist>
			</SideBarWrap>
		</>
	);
};

export default SideBar;

const SideBarWrap = styled.aside`
	background-color: white;
	width: 20%;
	position: fixed;
	top: 60px;
	padding: 40px 0px;
	height: 100%;
	overflow: auto;
	border-right: 1px solid #e9e9e9;
`;

const SideUlist = styled.ul`
	padding-top: 26px;
	padding-bottom: 26px;
`;

const SideList = styled.li`
	padding: 8px 36px;
	cursor: pointer;
	:hover {
		background: #e9e9e9;
	}
`;

const AddSideList = styled.button`
	width: 100%;
	padding: 8px 26px;
	cursor: pointer;
	:hover {
		background: #e9e9e9;
	}
`;
