import { useNavigate } from 'react-router-dom';
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
	console.log(props);
	const navigate = useNavigate();
	const userDafaultImgae = 'images/man_default_image.png';
	return (
		<>
			<Grid margin='10px' width='200px' height='80px' bg is_flex>
				<Grid bg padding='10px'>
					<Image shape={'circle'} src={userDafaultImgae} size={35} />
				</Grid>
				<Grid bg padding='10px'>
					<Text size='13px' margin='5px 0px' bold>
						Title
					</Text>
					<Text size='10px'>간단한 설명이 적혀져 있습니다.</Text>
				</Grid>
			</Grid>
		</>
	);
};

export default RefItem;
