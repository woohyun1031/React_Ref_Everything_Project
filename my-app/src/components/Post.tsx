import { Grid, Image, Text } from '../elements/index';

const Post = () => {
	return (
		<>
			<Grid>
				<Grid is_flex>
					<Image
						shape={'circle'}
						src={
							'https://static.remove.bg/remove-bg-web/6ad52d54336ad62d58e7bd1317d40fb98e377ad5/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg'
						}
						size={60}
					/>
					<Text bold>username</Text>
					<Text bold>{Date.now()}</Text>
				</Grid>
				<Grid>
					<Image
						shape={'rectangle'}
						src={
							'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
						}
					/>
				</Grid>
				<Grid padding='16px'>
					<Text>
						contents가 들어가는 부분입니다 지금은 Post를 작성하고 있습니다
					</Text>
				</Grid>
				<Grid padding='16px'>
					<Text bold>댓글 10개</Text>
				</Grid>
			</Grid>
		</>
	);
};

export default Post;
