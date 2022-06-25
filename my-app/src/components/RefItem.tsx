import { useNavigate } from 'react-router-dom';
import { Grid, Image, Text } from '../elements/index';
import { displayDate } from '../shared/common';

type PostProps = {
	id?: string;
	user_info?: {
		user_name?: string;
		user_profile?: string;
		user_id?: string;
	};
	image_url?: string;
	contents?: string;
	comment_cnt?: number;
	insert_dt?: number;
};

const RefItem = (props: PostProps) => {
	const { id, user_info, image_url, contents, comment_cnt, insert_dt } = props;
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
