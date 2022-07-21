import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid, Text, Button } from '../elements/index';
import { AppDispatch, RootState } from '../store/configStore';
import { changeComponent, changeComponentId } from '../store/modules/component';
import { getItem } from '../store/modules/item';
import { changePostId, openModal } from '../store/modules/modal';
import RefItem from './RefItem';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { FcCheckmark } from 'react-icons/fc';

type ItemType = {
	id?: string;
	component_id?: string;
	image_url?: string;
	item_url?: string;
	title?: string;
	contents?: string;
	insert_dt?: number;
};

type RefComponentsProps = {
	id: string;
	component_title?: string;
	user_id?: string;
};

const RefComponents = (props: RefComponentsProps) => {
	const { component_title, id } = props;

	const dispatch = useDispatch<AppDispatch>();
	const element = useRef<HTMLDivElement>(null);

	const item_list = useSelector((state: RootState) => state.item.list);
	const isDark = useSelector((state: RootState) => state.user.isDark);
	const isComponentLocation = useSelector(
		(state: RootState) => state.component.is_location
	);

	const [isUpdate, setIsUpdate] = useState(false);
	const [newTitle, setNewTitle] = useState('');

	useEffect(() => {
		if (id) dispatch(getItem(id));
	}, []);

	useEffect(() => {
		if (id === isComponentLocation) {
			element.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			dispatch(changeComponentId(''));
		}
	}, [isComponentLocation]);

	const onAddItem = async () => {
		console.log(item_list);
		if (id) dispatch(changePostId(id));
		dispatch(openModal('addItem'));
	};
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.target.value);
	};
	const changeTitle = () => {
		if (!isUpdate) {
			setIsUpdate(true); //icon변경
		} else {
			if (component_title === newTitle || !newTitle) {
				setIsUpdate(false); //icon변경
			} else {
				const compInfo = { id, newTitle };
				dispatch(changeComponent(compInfo));
				setIsUpdate(false); //icon변경
			}
		}
	};
	return (
		<>
			<RefComponentWrap ref={element}>
				<RefTitleWrap>
					{isUpdate ? (
						<Input
							type='input'
							name='title'
							placeholder={component_title}
							isDark={isDark}
							onChange={onChange}
							onBlur={changeTitle}
						/>
					) : (
						<Text margin='0px' size='20px' bold callback={changeTitle}>
							{component_title}
						</Text>
					)}
				</RefTitleWrap>
				<Grid is_flex>
					<RefItemWrap>
						{id
							? item_list[id]?.map((item: ItemType) => {
									return <RefItem key={item.id} {...item} />;
							  })
							: null}
						<Button
							width='200px'
							height='80px'
							margin='10px'
							text='+'
							font_size='25px'
							is_bold
							callback={onAddItem}
							font_color='button_title'
						/>
					</RefItemWrap>
				</Grid>
			</RefComponentWrap>
		</>
	);
};

export default React.memo(RefComponents);

const RefComponentWrap = styled.div`
	width: 100%;
	height: 100%;
	padding: 30px 10px;
	margin: 20px 0px;
	box-sizing: border-box;
	scroll-margin: 107px;
`;

const RefTitleWrap = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	padding: 16px 5px;
	margin: 5px 0px;
`;

const RefItemWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-wrap: wrap;
`;

const Input = styled.input<{ isDark: boolean }>`
	width: 100%;
	font-size: 20px;
	font-weight: 600;
	color: ${({ isDark }) => (isDark ? 'white' : '')};
	background: transparent;
`;

const Icon = styled.div<{ isDark: boolean }>`
	display: inline-block;
	margin-left: 5px;
	padding-top: 0;
	transition: 0.3s;
	color: ${({ isDark }) => (isDark ? 'white' : '')};
	cursor: pointer;
`;
