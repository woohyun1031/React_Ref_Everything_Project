import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Image, Text } from '../elements/index';
import { displayDate } from '../shared/common';

type PostProps = {
	id?: string;
	component_id?: string;
	image_url?: string;
	item_url?: string;
	title?: string;
	contents?: string;
	insert_dt?: number;
};

const RefItem = (props: PostProps) => {
	const { id, component_id, image_url, item_url, title, contents, insert_dt } =
		props;
	const navigate = useNavigate();
	const userDafaultImgae = 'images/man_default_image.png';
	return (
		<>
			<Grid margin='10px' width='200px' height='80px' bg is_flex is_shadow>
				<Grid bg padding='10px'>
					<Image shape={'circle'} src={image_url} size={35} />
				</Grid>
				<Grid bg padding='10px'>
					<Text size='13px' margin='5px 0px' bold>
						{title}
					</Text>
					<Text size='10px'>{contents}</Text>
				</Grid>
			</Grid>
		</>
	);
};

export default RefItem;

const RefItemBox = styled.div`
	box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.15);
`;
