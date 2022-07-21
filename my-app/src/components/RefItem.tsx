import styled from 'styled-components';
import { Grid, Image, Text } from '../elements/index';
import { textLengthOverCut } from '../shared/common';
import ModalCloseButton from '../modals/ModalCloseButton';
import { removeItem } from '../store/modules/item';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/configStore';

export type ItemType = {
	id?: string;
	component_id?: string;
	image_url?: string;
	item_url?: string;
	title?: string;
	contents?: string;
	insert_dt?: number;
};

const RefItem = (props: ItemType) => {
	const { id, component_id, image_url, item_url, title, contents } = props;
	const dispatch = useDispatch<AppDispatch>();
	const ItemRemoveClick = () => {
		if (confirm('Are you sure delete Item?')) {
			if (id && component_id) {
				const postInfo = { id, component_id };
				dispatch(removeItem(postInfo));
			}
		}
	};

	return (
		<>
			<RefItemBox href={item_url} target='_blank' rel='noopener noreferrer'>
				<ModalCloseButton
					top='10px'
					right='10px'
					callback={(e: MouseEvent) => {
						e.preventDefault();
						ItemRemoveClick();
					}}
				/>
				<Grid margin='10px' width='200px' height='80px' bg is_flex is_shadow>
					<Grid bg padding='10px'>
						<Image shape={'profile_rectangle'} src={image_url} size={30} />
					</Grid>
					<Grid bg padding='10px' overflow>
						<Text size='8px' margin='5px 0px' bold>
							{title}
						</Text>
						<Text size='5px'>{contents && textLengthOverCut(contents)}</Text>
					</Grid>
				</Grid>
			</RefItemBox>
		</>
	);
};

export default RefItem;

const RefItemBox = styled.a`
	text-decoration: none;
	transition: 0.3s;
	cursor: pointer;
	:hover {
		transform: translateY(-2px);
		filter: brightness(115%);
	}
	:active {
		filter: brightness(85%);
	}
`;
