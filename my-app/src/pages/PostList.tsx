import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/configStore';
import { getPost } from '../store/modules/post';
import { Button } from '../elements/index';
import Spinner from '../elements/Spinner';
import styled from 'styled-components';
import RefComponents from '../components/RefComponents';

const PostList = () => {
	const dispatch = useDispatch<AppDispatch>();
	const post_list = useSelector((state: RootState) => state.post.list);
	const isLoading = useSelector((state: RootState) => state.post.is_loading);
	console.log('redering');

	useEffect(() => {
		dispatch(getPost());
	}, []);

	const onclick = () => {
		dispatch(getPost());
	};

	return (
		<>
			<PostListWrap>
				<RefComponents />
				<RefComponents />
				{/* {post_list?.map((post, index) => {
					return <Post key={post.id} {...post} />;
				})} */}
			</PostListWrap>
			{isLoading ? (
				<Spinner type='inline' size={80} is_dim={false} />
			) : (
				<Button callback={onclick} text={'더 보기'} />
			)}
		</>
	);
};

export default PostList;

const PostListWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-wrap: wrap;
	padding: 16px;
`;
