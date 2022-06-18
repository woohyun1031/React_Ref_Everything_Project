import { Grid } from '../elements';
import Post from '../components/Post';
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';
import { getOnePost } from '../store/modules/post';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/configStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

type PostDetailType = {};

const PostDetail = (props: PostDetailType) => {
	const dispatch = useDispatch<AppDispatch>();
	const { id: postId } = useParams();

	useEffect(() => {
		if (postId) dispatch(getOnePost(postId));
	}, []);

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
