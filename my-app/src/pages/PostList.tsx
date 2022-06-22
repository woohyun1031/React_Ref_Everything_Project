import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post';
import { AppDispatch, RootState } from '../store/configStore';
import { getPost } from '../store/modules/post';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { Button, Grid } from '../elements/index';
import Spinner from '../elements/Spinner';

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
			<Grid padding='16px'>
				{post_list?.map((post, index) => {
					return <Post key={post.id} {...post} />;
				})}
			</Grid>
			{isLoading ? (
				<Spinner type='inline' size={80} is_dim={false} />
			) : (
				<Button callback={onclick} text={'추가하기'} />
			)}
		</>
	);
};

export default PostList;
