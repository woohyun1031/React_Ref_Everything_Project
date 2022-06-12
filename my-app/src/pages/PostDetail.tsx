import { Grid, Text, Button, Input, Image, Upload } from '../elements';
import Post from '../components/Post';
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';

type PostDetailType = {};

const PostDetail = (props: PostDetailType) => {
	return (
		<>
			<Grid padding='16px'>
				<Post />
				<CommentWrite />
				<CommentList />
			</Grid>
		</>
	);
};

export default PostDetail;
