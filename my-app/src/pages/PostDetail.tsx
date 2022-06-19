import { Grid } from '../elements';
import Post from '../components/Post';
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';
import { getOnePost } from '../store/modules/post';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/configStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type PostDetailType = {};

type PostType = {
	user_info?: {
		user_name?: string;
		user_profile?: string;
		user_id?: string;
	};
	image_url?: string;
	contents?: string;
	comment_cnt?: number;
	insert_dt?: string;
};

const PostDetail = (props: PostDetailType) => {
	const dispatch = useDispatch<AppDispatch>();
	const { id: postId } = useParams();
	const [isPostData, setIsPostData] = useState<PostType>();

	useEffect(() => {
		if (postId)
			dispatch(getOnePost(postId)).then((result) => {
				const new_post = result.payload as PostType;
				setIsPostData(new_post);
			});
	}, []);

	return (
		<>
			<Grid padding='16px'>
				<Post {...isPostData} />
				<CommentWrite />
				<CommentList />
			</Grid>
		</>
	);
};

export default PostDetail;
