import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post';
import { AppDispatch, RootState } from '../store/configStore';
import { getPost } from '../store/modules/post';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

type PostListProps = {};
const PostList = (props: PostListProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const post_list = useSelector((state: RootState) => state.post.list);
	console.log('redering');

	useEffect(() => {
		console.log('render effect');
		dispatch(getPost());
	}, []);

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
		</div>
	);
};

export default PostList;
