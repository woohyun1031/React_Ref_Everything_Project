import { Grid, Text, Button, Image, Input } from '../elements/index';

type CommentWriteProps = {
	_isLogin?: boolean | undefined;
};

const CommentWrite = (props: CommentWriteProps) => {
	return (
		<>
			<Grid padding='16px' is_flex>
				<Input width='100%' placeholder='댓글을 입력해주세요' />
				<Button width='90px' margin='0px 10px 0px 10px' text='댓글 작성' />
			</Grid>
		</>
	);
};

export default CommentWrite;
