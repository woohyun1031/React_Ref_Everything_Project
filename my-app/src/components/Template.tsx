import styled from 'styled-components';

type TodoTemplateProps = {
	children?: any;
};

const TodoTemplate = (props: TodoTemplateProps) => {
	return <TodoTemplateBlock>{props.children}</TodoTemplateBlock>;
};

const TodoTemplateBlock = styled.div`
	width: 512px;
	padding: 30px;
	background: white;
	border-radius: 16px;
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
	margin: 100px auto; /* 페이지 중앙에 나타나도록 설정 */
`;

export default TodoTemplate;
