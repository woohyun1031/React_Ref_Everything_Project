import { useNavigate } from 'react-router-dom';
import { Grid, Text, Button, Input, Image, Upload } from '../elements';
import TextArea from '../elements/TextArea';

type PostWriteType = {};

const PostWrite = (props: PostWriteType) => {
	const navigate = useNavigate();

	return (
		<>
			<Grid padding='16px'>
				<Text size='36px'>게시글 작성</Text>
				<Upload />
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
			<button
				onClick={() => {
					navigate('/post/1');
				}}
			>
				postdetail page 임시 이동
			</button>
		</>
	);
};

export default PostWrite;
