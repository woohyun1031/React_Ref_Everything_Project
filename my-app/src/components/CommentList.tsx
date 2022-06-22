import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Image, Text, Button } from '../elements/index';
import { AppDispatch, RootState } from '../store/configStore';
import { getComment } from '../store/modules/comment';
import CommentItem from './CommentItem';

type CommentListProps = {
	post_id?: string;
};

const CommentList = (props: CommentListProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const comment_list = useSelector(
		(state: RootState) => state.comment.comment_list
	);

	useEffect(() => {
		if (props.post_id) dispatch(getComment(props.post_id));
	}, []);

	if (!comment_list || !props.post_id) {
		console.log('!comment_list || !props.post_id');
		return null;
	}

	return (
		<>
			<Grid padding='16px'>
				{comment_list.map((comment) => {
					return <CommentItem key={comment.id} {...comment} />;
				})}
			</Grid>
		</>
	);
};

export default React.memo(CommentList);
