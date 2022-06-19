import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Text, Button, Upload, TextArea } from '../elements';
import { getCookie } from '../shared/Cookie';
import { AppDispatch } from '../store/configStore';
import { addPost } from '../store/modules/post';

type PostWriteType = {};

const PostWrite = (props: PostWriteType) => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const _isToken = getCookie('isLogin') ? true : false;
	const [isContents, setIsContents] = useState('');

	const changeContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setIsContents(e.target.value);
	};

	const onAddPost = async () => {
		try {
			await dispatch(addPost(isContents));
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
				<Upload />
			</Grid>
			<Grid padding='16px'>
				<TextArea
					label='게시글 내용'
					placeholder='게시글 작성'
					callback={changeContents}
				/>
			</Grid>
			<Grid padding='16px'>
				<Button text='게시글 작성' callback={onAddPost} />
			</Grid>
		</>
	);
};

export default PostWrite;
