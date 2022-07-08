import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/configStore';
import { Text, Button } from '../elements/index';
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

	return (
		<>
			<HeaderPlaceHolder />
			<PostListWrap>
				{component_list.map((component, index) => {
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
	padding: 0px 50px;
	margin-bottom: 300px;
`;
const HeaderPlaceHolder = styled.div`
	height: 61px;
	margin: 0px;
`;
