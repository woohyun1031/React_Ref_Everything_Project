import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/configStore';
import { Button, Grid } from '../elements';
import Post from '../components/Post';
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';
import { addComment } from '../store/modules/comment';

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
	insert_dt?: number;
};

const PostDetail = (props: PostDetailType) => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const isUserId = useSelector((state: RootState) => state.user.user.user_uid);
	const isLogin = useSelector((state: RootState) => state.user.isLogin);
	const { id: postId } = useParams();
	const [isPostData, setIsPostData] = useState<PostType>();
	const [isContents, setIsContents] = useState('');



	const changeContents = (e: ChangeEvent<HTMLInputElement>) => {
		setIsContents(e.target.value);
	};

	const onAddComment = async () => {
		if (isContents === '') {
			alert('댓글을 입력해주세요!');
			return;
		}
		if (postId) {
			const comment_info = { post_id: postId, contents: isContents };
			await dispatch(addComment(comment_info));
			setIsContents('');
		}
	};

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
				<CommentWrite
					_isLogin={isLogin}
					post_id={postId}
					isContents={isContents}
					_onChange={changeContents}
					_onClick={onAddComment}
				/>
				<CommentList post_id={postId} />
			</Grid>
		</>
	);
};

export default PostDetail;
