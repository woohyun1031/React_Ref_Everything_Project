import { Grid, Text, Button, Input, Image } from '../elements';
import TextArea from '../elements/TextArea';

type PostWriteType = {};

const PostWrite = (props: PostWriteType) => {
	return (
		<>
			<Grid padding='16px'>
				<Text size='36px'>게시글 작성</Text>
				<input type='file' />
				{/* 파일 import */}
			</Grid>
			<Grid>
				<Grid padding='16px'>
					<Text size='15px'>미리보기</Text>
				</Grid>
				<Image shape='rectangle' />
			</Grid>
			<Grid padding='16px'>
				<TextArea label='게시글 내용' placeholder='게시글 작성' />
			</Grid>
			<Grid padding='16px'>
				<Button text='게시글 작성' />
			</Grid>
		</>
	);
};

export default PostWrite;
