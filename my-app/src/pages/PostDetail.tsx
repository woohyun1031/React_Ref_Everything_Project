import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/configStore';
import { getOnePost } from '../store/modules/post';
import { Button, Grid } from '../elements';
import Post from '../components/Post';
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';

type PostDetailType = {};

type PostType = {
	id?: string;
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
	const navigate = useNavigate();
	const isUserId = useSelector((state: RootState) => state.user.user.user_uid);
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
				<Grid padding='16px' is_flex>
					{isUserId === isPostData?.user_info?.user_id ? (
						<Button
							width='50px'
							text='수정'
							callback={() => {
								navigate(`/update/${postId}`);
							}}
						/>
					) : null}
				</Grid>
				<CommentWrite />
				<CommentList />
			</Grid>
		</>
	);
};

export default PostDetail;
