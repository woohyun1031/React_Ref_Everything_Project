import { useSelector } from 'react-redux';
import Post from '../components/Post';
import { RootState } from '../store/configStore';

type PostListProps = {};
const PostList = (props: PostListProps) => {
	const post_list = useSelector((state: RootState) => state.post.list);
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
