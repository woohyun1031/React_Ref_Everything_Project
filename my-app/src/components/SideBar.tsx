import { Text } from '../elements/index';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store/configStore';

type SideProps = {
	_isLogin?: boolean | undefined;
};

const SideBar = (props: SideProps) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const component_list = useSelector(
		(state: RootState) => state.component.list
	);

	return (
		<>
			<SideBarWrap>
				<SideUlist>
					{props._isLogin ? (
						component_list ? (
							component_list.map((component, index) => {
								return (
									<SideList key={component.id}>
										<Text size='13px' bold>
											{component.component_title}
										</Text>
									</SideList>
								);
							})
						) : (
							<SideList>component가 존재하지 않습니다</SideList>
						)
					) : null}
					{props._isLogin ? (
						<AddSideList>+ 추가하기</AddSideList>
					) : (
						<SideList>🤬 Please login </SideList>
					)}
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
