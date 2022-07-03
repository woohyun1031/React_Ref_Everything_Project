import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid, Image, Text, Button } from '../elements/index';
import { AppDispatch, RootState } from '../store/configStore';
import { changeComponentId } from '../store/modules/component';
import { addItem, getItem } from '../store/modules/item';
import { changePostId, openModal } from '../store/modules/modal';
import RefItem from './RefItem';

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
	id?: string;
	component_title?: string;
	user_id?: string;
};

type listType = {
	[index: string]: any;
};

const RefComponents = (props: RefComponentsProps) => {
	const element = useRef<HTMLDivElement>(null);
	const { component_title, id, user_id } = props;
	const item_list = useSelector((state: RootState) => state.item.list);
	const isComponentLocation = useSelector(
		(state: RootState) => state.component.is_location
	);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (id) dispatch(getItem(id));
	}, []);
	useEffect(() => {
		if (id === isComponentLocation) {
			// const elementLocation = element.current?.getBoundingClientRect().top;
			// window.scrollTo({
			// 	top: elementLocation,
			// 	behavior: 'smooth',
			// });
			element.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			dispatch(changeComponentId(''));
		}
	}, [isComponentLocation]);

	const onAddItem = async () => {
		console.log(item_list);
		if (id) dispatch(changePostId(id));
		dispatch(openModal('addItem'));
		//if (id) await dispatch(addItem(id));
	};
	return (
		<>
			<RefComponentWrap ref={element}>
				<Grid padding='16px 5px' margin='5px 0px'>
					<Text margin='0px' size='20px' bold>
						{component_title}
					</Text>
				</Grid>
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
	padding: 30px 100px;
	margin: 20px 0px;
	box-sizing: border-box;
	scroll-margin: 107px;
`;

const RefItemWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-wrap: wrap;
`;
