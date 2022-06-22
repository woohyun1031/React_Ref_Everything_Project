import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Text, Button, Image, Input } from '../elements/index';
import { AppDispatch } from '../store/configStore';
import { addComment } from '../store/modules/comment';

type CommentWriteProps = {
	_isLogin?: boolean;
	post_id?: string;
};

const CommentWrite = (props: CommentWriteProps) => {
	const [isContents, setIsContents] = useState('');
	const dispatch = useDispatch<AppDispatch>();

	const changeContents = (e: ChangeEvent<HTMLInputElement>) => {
		setIsContents(e.target.value);
	};

	const onAddComment = () => {
		if (isContents === '') {
			alert('댓글을 입력해주세요!');
			return;
		}
		if (props.post_id) {
			const comment_info = { post_id: props.post_id, contents: isContents };
			dispatch(addComment(comment_info));
		}
	};

	return (
		<>
			<Grid padding='16px' is_flex>
				<Input
					callback={changeContents}
					width='100%'
					placeholder='댓글을 입력해주세요'
					value={isContents}
				/>
				<Button
					width='90px'
					margin='0px 0px 0px 10px'
					text='댓글 작성'
					callback={onAddComment}
				/>
			</Grid>
		</>
	);
};

export default CommentWrite;
