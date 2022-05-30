import Grid from '../elements/Grid';

const Post = () => {
	return (
		<>
			<Grid padding='16px'>
				<Grid is_flex>
					<div>user Profile, username, insert_date, is Me (edit button)</div>
				</Grid>
				<Grid padding='16px'>
					<div>contents</div>
				</Grid>
				<Grid>
					<div>image</div>
				</Grid>
				<Grid padding='16px'>
					<div>comment cnt</div>
				</Grid>
			</Grid>
		</>
	);
};

export default Post;
