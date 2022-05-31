import styled from 'styled-components';

type TextProps = {
	bold?: boolean | undefined;
	color?: string | undefined;
	size?: string | undefined;
	children?: any | undefined;
};

const Text = (props: TextProps) => {
	const { bold, color, size, children } = props;

	const styles = {
		bold,
		color,
		size,
	};

	return <Ptag {...styles}>{children}</Ptag>;
};

export default Text;

const Ptag = styled.p<{ bold?: boolean; color?: string; size?: string }>`
	color: ${({ color }) => (color ? color : '#222831')};
	font-size: ${({ size }) => (size ? size : '14px')};
	font-weight: ${({ bold }) => (bold ? '600' : '400')};
`;
