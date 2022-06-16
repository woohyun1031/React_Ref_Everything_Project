import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Text, Button, Image, Upload, TextArea } from '../elements';
import { getCookie } from '../shared/Cookie';
import { RootState } from '../store/configStore';

type PostWriteType = {};

const PostWrite = (props: PostWriteType) => {
	const navigate = useNavigate();
	const _isToken = getCookie('isLogin') ? true : false;
	const [isContents, setIsContents] = useState('');

	const changeContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setIsContents(e.target.value);
	};

	const addPost = () => {};

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
				<Upload />
			</Grid>
			<Grid>
				<Grid padding='16px'>
					<Text size='15px'>미리보기</Text>
				</Grid>
				<Image shape='rectangle' />
			</Grid>
			<Grid padding='16px'>
				<TextArea
					label='게시글 내용'
					placeholder='게시글 작성'
					callback={changeContents}
				/>
			</Grid>
			<Grid padding='16px'>
				<Button text='게시글 작성' callback={() => {}} />
			</Grid>
		</>
	);
};

export default PostWrite;
