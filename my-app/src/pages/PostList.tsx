import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/configStore';
import { getPost } from '../store/modules/post';
import { Button } from '../elements/index';
import Spinner from '../elements/Spinner';
import styled from 'styled-components';
import RefComponents from '../components/RefComponents';
import { getComponent } from '../store/modules/component';

const PostList = () => {
	const dispatch = useDispatch<AppDispatch>();
	const component_list = useSelector(
		(state: RootState) => state.component.list
	);
	const isLoading = useSelector((state: RootState) => state.post.is_loading);
	console.log('redering');

	useEffect(() => {
		dispatch(getComponent());
	}, []);

	const onClick = () => {
		console.log(component_list);
	};

	return (
		<>
			<PostListWrap>
				{component_list?.map((component, index) => {
					return <RefComponents key={component.id} {...component} />;
				})}
			</PostListWrap>
			{/* {isLoading ? (
				<Spinner type='inline' size={80} is_dim={false} />
			) : (
				<Button callback={onClick} text={'더 보기'} />
			)} */}
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
