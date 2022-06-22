import { Grid, Image, Text, Button } from '../elements/index';

type CommentItemProps = {
	id?: string;
	user_profile?: string;
	user_name?: string;
	user_id?: string;
	post_id?: string;
	contents?: string;
	insert_dt?: string;
};

const CommentItem = (props: CommentItemProps) => {
	const { user_profile, user_name, user_id, post_id, contents, insert_dt } =
		props;

	return (
		<>
			<Grid border is_flex bg margin='10px 0px'>
				<Grid is_flex width='auto' bg>
					<Image src={user_profile} shape='circle' size={30} />
					<Text bold>{user_name}</Text>
				</Grid>
				<Grid is_flex margin='0px 4px' bg>
					<Grid margin='0px 5px' padding='0px 5px'>
						<Text margin='0px'>{contents}</Text>
					</Grid>
					<Grid padding='0px 5px'>
						<Text margin='0px'>{insert_dt}</Text>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default CommentItem;
