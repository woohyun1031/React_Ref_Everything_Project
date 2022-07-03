import { Text } from '../elements/index';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../store/configStore';
import { addComponent, changeComponentId } from '../store/modules/component';
import { MouseEvent } from 'react';

type SideProps = {
	_isLogin?: boolean | undefined;
};

const SideBar = (props: SideProps) => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const component_list = useSelector(
		(state: RootState) => state.component.list
	);

	const onAddComponent = () => {
		dispatch(addComponent());
	};

	const scrollClick = (component_id: string | undefined) => {
		if (component_id) {
			dispatch(changeComponentId(component_id));
		}
	};

	return (
		<>
			<SideBarWrap>
				<SideUlist>
					{props._isLogin ? (
						component_list ? (
							component_list.map((component, index) => {
								return (
									<SideList key={component.id}>
										<Text
											size='13px'
											bold
											color='#585858'
											callback={() => scrollClick(component.id)}
										>
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
						<AddSideList onClick={onAddComponent}>+ 추가하기</AddSideList>
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
	width: 15%;
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
	margin-bottom: 15px;
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
