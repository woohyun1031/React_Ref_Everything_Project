import styled from 'styled-components';

type TextProps = {
	bold?: boolean;
	color?: string;
	size?: string;
	margin?: string;
	callback?(): any;
	children?: any;
};

const Text = (props: TextProps) => {
	const { bold, color, size, margin, callback, children } = props;

	const styles = {
		bold,
		color,
		size,
		margin,
		isCallback: callback ? true : false,
	};

	return (
		<>
			<Ptag {...styles} onClick={callback}>
				{children}
			</Ptag>
		</>
	);
};

export default Text;

const Ptag = styled.p<{
	bold?: boolean;
	color?: string;
	size?: string;
	margin?: string;
	isCallback?: boolean;
}>`
	color: ${({ color }) => (color ? color : '#222831')};
	font-size: ${({ size }) => (size ? size : '14px')};
	font-weight: ${({ bold }) => (bold ? '600' : '400')};
	margin: ${({ margin }) => (margin ? margin : '0px')};
	${({ isCallback }) => (isCallback ? 'cursor:pointer' : '')};
`;
