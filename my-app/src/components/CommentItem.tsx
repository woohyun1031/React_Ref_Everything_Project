import { Grid, Image, Text, Button } from '../elements/index';

type CommentItemProps = {
	user_profile?: string;
	user_name?: string;
	user_Id?: string;
	post_Id?: string;
	contents?: string;
	insert_day?: string;
};

const CommentItem = (props: CommentItemProps) => {
	const { user_profile, user_name, user_Id, post_Id, contents, insert_day } =
		props;

	return (
		<>
			<Grid border is_flex bg>
				<Grid is_flex width='auto' bg>
					<Image
						src='https://static.remove.bg/remove-bg-web/6ad52d54336ad62d58e7bd1317d40fb98e377ad5/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg'
						shape='circle'
						size={30}
					/>
					<Text bold>userName</Text>
				</Grid>
				<Grid is_flex margin='0px 4px'>
					<Text margin='0px'>isContents...</Text>
					<Text margin='0px'>20xx-xx-xx-xxxx</Text>
				</Grid>
			</Grid>
		</>
	);
};

export default CommentItem;
