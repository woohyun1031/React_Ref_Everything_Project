import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Image, Text, Button } from '../elements/index';
import RefItem from './RefItem';

type CommentListProps = {
	post_id?: string;
};

const RefComponents = (props: CommentListProps) => {
	return (
		<>
			<Grid padding='16px' margin='30px 0px' width='80%'>
				<Grid padding='16px 5px' margin='5px 0px'>
					<Text margin='0px' size='20px' bold>
						👾 Components Title
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
