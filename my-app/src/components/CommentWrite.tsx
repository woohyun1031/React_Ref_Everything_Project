import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Text, Button, Image, Input } from '../elements/index';
import Spinner from '../elements/Spinner';
import { RootState } from '../store/configStore';

type CommentWriteProps = {
	_isLogin?: boolean;
	post_id?: string;
	isContents?: string;
	_onChange?(e: ChangeEvent<HTMLInputElement>): any;
	_onClick?(): any;
};

const CommentWrite = (props: CommentWriteProps) => {
	const isLoading = useSelector((state: RootState) => state.comment.is_loading);
	return (
		<>
			<Grid padding='16px' is_flex>
				<Input
					callback={props._onChange}
					width='100%'
					placeholder={
						props._isLogin
							? '댓글을 입력해주세요'
							: '로그인이 필요한 서비스 입니다.'
					}
					value={props.isContents}
					disable={!props._isLogin ? true : false}
				/>
				{isLoading ? (
					<Spinner type='inline' size={80} is_dim={false} />
				) : props._isLogin ? (
					<Button
						width='90px'
						margin='0px 0px 0px 10px'
						text='댓글 작성'
						callback={props._onClick}
					/>
				) : null}
			</Grid>
		</>
	);
};

export default CommentWrite;
