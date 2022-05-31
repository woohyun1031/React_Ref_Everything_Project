import styled from 'styled-components';

type GridProps = {
	is_flex?: boolean | undefined;
	width?: string | undefined;
	padding?: string | undefined;
	margin?: string | undefined;
	bg?: boolean | undefined;
	children?: any | undefined;
};

const Grid = (props: GridProps) => {
	const { is_flex, width, padding, margin, bg, children } = props;
	const styles = {
		is_flex,
		width,
		padding,
		margin,
		bg,
	};

	return <GridBox {...styles}>{children}</GridBox>;
};

export default Grid;

const GridBox = styled.div<{
	is_flex?: boolean;
	width?: string;
	padding?: string;
	margin?: string;
	bg?: boolean;
}>`
	width: ${({ width }) => width};
	height: 100%;
	box-sizing: border-box;
	padding: ${({ padding }) => (padding ? padding : '0px')};
	margin: ${({ margin }) => (margin ? margin : '0px')};
	background-color: ${({ bg }) => (bg ? 'red' : 'gray')};
	display: ${({ is_flex }) => (is_flex ? 'flex' : '0')};
	align-items: ${({ is_flex }) => (is_flex ? 'center' : '0')};
	justify-content: ${({ is_flex }) => (is_flex ? 'space-between' : '0')};
`;
