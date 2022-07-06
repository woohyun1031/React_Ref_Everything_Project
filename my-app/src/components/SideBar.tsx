import { Text } from '../elements/index';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../store/configStore';
import { changeComponentId } from '../store/modules/component';
import { openModal } from '../store/modules/modal';

type SideProps = {
	_isLogin?: boolean | undefined;
};

const SideBar = (props: SideProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const component_list = useSelector(
		(state: RootState) => state.component.list
	);

	const onAddComponent = () => {
		dispatch(openModal('addComponent'));
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
									<SideList
										key={component.id}
										onClick={() => scrollClick(component.id)}
									>
										<Text size='13px' bold color='side_title'>
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
					) : null}
				</SideUlist>
			</SideBarWrap>
		</>
	);
};

export default SideBar;

const SideBarWrap = styled.aside`
	background-color: ${({ theme }) => theme.colors.side_background};
	width: 210px;
	position: fixed;
	top: 60px;
	padding: 40px 0px;
	height: 100%;
	overflow: auto;
	border-right: 1px solid ${({ theme }) => theme.colors.side_border};
`;

const SideUlist = styled.ul`
	padding-top: 26px;
	padding-bottom: 26px;
`;

const SideList = styled.li`
	color: ${({ theme }) => theme.colors.side_title};
	margin-bottom: 15px;
	padding: 8px 36px;
	cursor: pointer;
	&:hover {
		filter: brightness(105%);
	}
	&:active {
		filter: brightness(95%);
	}
`;

const AddSideList = styled.button`
	color: ${({ theme }) => theme.colors.side_title};
	width: 100%;
	padding: 8px 26px;
	cursor: pointer;
	&:hover {
		filter: brightness(105%);
	}
	&:active {
		filter: brightness(95%);
	}
`;
