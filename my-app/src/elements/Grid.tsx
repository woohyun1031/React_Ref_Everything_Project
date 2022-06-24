import styled from 'styled-components';

type GridProps = {
	is_flex?: boolean;
	position?: string;
	width?: string;
	padding?: string;
	height?: string;
	margin?: string;
	bg?: boolean;
	children?: any;
	border?: boolean;
};

const Grid = (props: GridProps) => {
	const {
		is_flex,
		width,
		padding,
		margin,
		bg,
		border,
		children,
		height,
		position,
	} = props;
	const styles = {
		is_flex,
		width,
		padding,
		margin,
		bg,
		border,
		height,
		position,
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
	border?: boolean;
	height?: string;
}>`
	width: ${({ width }) => width};
	height: ${({ height }) => (height ? height : '100%')};
	box-sizing: border-box;
	padding: ${({ padding }) => (padding ? padding : '0px')};
	margin: ${({ margin }) => (margin ? margin : '0px')};
	background-color: ${({ bg }) => (bg ? 'white' : '#F8F8F8')};
	border: ${({ border }) => (border ? '1px black solid' : 'none')};
	display: ${({ is_flex }) => (is_flex ? 'flex' : 'block')};
	${({ is_flex }) => (is_flex ? 'align-items: center' : '')};
	${({ is_flex }) => (is_flex ? 'justify-content: space-between' : '')};
`;
