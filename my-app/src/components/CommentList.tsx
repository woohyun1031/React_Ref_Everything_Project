import { Grid, Image, Text, Button } from '../elements/index';
import CommentItem from './CommentItem';

type CommentListProps = {};

const CommentList = (props: CommentListProps) => {
	return (
		<>
			<Grid padding='16px'>
				<CommentItem />
				<CommentItem />
				<CommentItem />
				<CommentItem />
			</Grid>
		</>
	);
};

export default CommentList;
