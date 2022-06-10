import styled from 'styled-components';

type TextProps = {
	bold?: boolean;
	color?: string;
	size?: string;
	margin?: string;
	children?: any;
};

const Text = (props: TextProps) => {
	const { bold, color, size, margin, children } = props;

	const styles = {
		bold,
		color,
		size,
		margin,
	};

	return (
		<>
			<Ptag {...styles}>{children}</Ptag>
		</>
	);
};

export default Text;

const Ptag = styled.p<{
	bold?: boolean;
	color?: string;
	size?: string;
	margin?: string;
}>`
	color: ${({ color }) => (color ? color : '#222831')};
	font-size: ${({ size }) => (size ? size : '14px')};
	font-weight: ${({ bold }) => (bold ? '600' : '400')};
	margin: ${({ margin }) => (margin ? margin : '0px')};
`;
