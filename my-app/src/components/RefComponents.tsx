import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid, Image, Text, Button } from '../elements/index';
import { AppDispatch, RootState } from '../store/configStore';
import { addItem, getItem } from '../store/modules/item';
import { openModal } from '../store/modules/modal';
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
	const { component_title, id, user_id } = props;
	const item_list = useSelector((state: RootState) => state.item.list);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (id) dispatch(getItem(id));
	}, []);

	const onAddItem = async () => {
		console.log(item_list);
		dispatch(openModal('addItem'));
		//if (id) await dispatch(addItem(id));
	};
	return (
		<>
			<Grid padding='16px' margin='30px 0px' width='100%'>
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
			</Grid>
		</>
	);
};

export default React.memo(RefComponents);

const RefItemWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-wrap: wrap;
`;
