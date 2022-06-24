import styled from 'styled-components';

type TemplateProps = {
	children?: any;
};

const Template = (props: TemplateProps) => {
	return <TodoTemplateBlock>{props.children}</TodoTemplateBlock>;
};

const TodoTemplateBlock = styled.div`
	display: flex;
	position: relative;
`;

export default Template;
