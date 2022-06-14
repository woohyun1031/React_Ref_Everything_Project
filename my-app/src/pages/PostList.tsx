import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post';
import { AppDispatch, RootState } from '../store/configStore';
import { getPost } from '../store/modules/post';

type PostListProps = {};
const PostList = (props: PostListProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const post_list = useSelector((state: RootState) => state.post.list);
	useEffect(() => {
		dispatch(getPost());
	}, []);
	return (
		<div>
			<Post />
			{post_list?.map((post, index) => {
				return <Post key={post.id} {...post} />;
			})}
		</div>
	);
};

export default PostList;
