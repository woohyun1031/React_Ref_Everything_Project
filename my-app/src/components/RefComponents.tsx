import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Grid, Image, Text, Button } from '../elements/index';
import { AppDispatch } from '../store/configStore';
import RefItem from './RefItem';

type RefComponentsProps = {
	id?: string;
	component_title?: string;
	user_id?: string;
};

const RefComponents = (props: RefComponentsProps) => {
	const { component_title, id, user_id } = props;
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {}, []);
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
						<RefItem />
						<RefItem />
						<RefItem />
						<RefItem />
						<RefItem />
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
