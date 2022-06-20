import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Text, Button, Upload, TextArea } from '../elements';
import { getCookie } from '../shared/Cookie';
import { AppDispatch } from '../store/configStore';
import { addPost, getOnePost } from '../store/modules/post';

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

const PostUpdate = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const _isToken = getCookie('isLogin') ? true : false;
	const { id: postId } = useParams();

	const [isPostData, setIsPostData] = useState<PostType>();
	const [isContents, setIsContents] = useState(isPostData?.contents);

	const changeContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setIsContents(e.target.value);
	};
	useEffect(() => {
		if (postId) {
			dispatch(getOnePost(postId)).then((result) => {
				console.log(result);
				const new_post = result.payload as PostType;
				setIsPostData(new_post);
				setIsContents(new_post.contents);
			});
		}
	}, []);

	const onUpdatePost = async () => {
		try {
			if (isContents) await dispatch(addPost(isContents));
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	if (!_isToken) {
		return (
			<>
				<Grid margin='100px 0px' padding='16px'>
					<Text size='32px' bold>
						Warning!!
					</Text>
					<Text size='16px'>로그인 후에 글을 작성 할 수 있습니다.</Text>
				</Grid>
			</>
		);
	}

	return (
		<>
			<Grid padding='16px'>
				<Text size='36px'>게시글 작성</Text>
				<Grid padding='16px 0px'>
					<Text size='15px'>미리보기</Text>
				</Grid>
				{console.log(isPostData)}
				<Upload isUpdate isDefaultImage={isPostData?.image_url} />
			</Grid>
			<Grid padding='16px'>
				<TextArea
					label='게시글 내용'
					placeholder='게시글 작성'
					callback={changeContents}
					value={isContents}
				/>
			</Grid>
			<Grid padding='16px'>
				<Button text='게시글 작성' callback={onUpdatePost} />
			</Grid>
		</>
	);
};

export default PostUpdate;
