import styled from 'styled-components';

type TemplateProps = {
	children?: any;
};

const Template = (props: TemplateProps) => {
	return <TodoTemplateBlock>{props.children}</TodoTemplateBlock>;
};

const TodoTemplateBlock = styled.div`	
	width: 100%;
	display: flex;
	margin-top: 0;
	position: relative;
`;

export default Template;
