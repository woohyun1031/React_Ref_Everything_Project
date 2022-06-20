import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post';
import { AppDispatch, RootState } from '../store/configStore';
import { getPost } from '../store/modules/post';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { Button } from '../elements/index';

type PostListProps = {};
const PostList = (props: PostListProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const post_list = useSelector((state: RootState) => state.post.list);
	console.log('redering');

	useEffect(() => {
		console.log('render effect');
		console.log('render getPost');
		dispatch(getPost());
	}, []);

	const onclick = () => {
		dispatch(getPost());
	};

	// useBottomScrollListener(() => {
	// 	console.log('getPost');
	// 	dispatch(getPost());
	// 	console.log(post_list);
	// });

	return (
		<div>
			{post_list?.map((post, index) => {
				return <Post key={post.id} {...post} />;
			})}
			<Button callback={onclick} text={'추가하기'} />
		</div>
	);
};

export default PostList;
