import styled from 'styled-components';

type GridProps = {
	is_shadow?: boolean;
	is_flex?: boolean;
	is_Center?: boolean;
	position?: string;
	width?: string;
	padding?: string;
	height?: string;
	margin?: string;
	bg?: boolean;
	children?: any;
	border?: boolean;
	overflow?: boolean;
};

const Grid = (props: GridProps) => {
	const {
		is_shadow,
		is_flex,
		width,
		padding,
		margin,
		bg,
		border,
		children,
		height,
		position,
		overflow,
		is_Center,
	} = props;
	const styles = {
		is_shadow,
		is_flex,
		width,
		padding,
		margin,
		bg,
		border,
		height,
		position,
		overflow,
		is_Center
	};

	return <GridBox {...styles}>{children}</GridBox>;
};

export default Grid;

const GridBox = styled.div<{
	is_shadow?: boolean;
	is_flex?: boolean;
	width?: string;
	padding?: string;
	margin?: string;
	bg?: boolean;
	border?: boolean;
	height?: string;
	overflow?: boolean;
	is_Center?: boolean;
}>`
	width: ${({ width }) => width};
	height: ${({ height }) => (height ? height : '100%')};
	box-sizing: border-box;
	padding: ${({ padding }) => (padding ? padding : '0px')};
	margin: ${({ margin }) => (margin ? margin : '0px')};
	background-color: ${({ theme, bg }) =>
		bg ? theme.colors.background : theme.colors.subBackground};
	border: ${({ border }) => (border ? '1px black solid' : 'none')};
	${({ is_shadow }) =>
		is_shadow ? 'box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.15);' : ''};
	display: ${({ is_flex, is_Center }) => (is_flex||is_Center ? 'flex' : 'block')};
	${({ is_flex,is_Center }) => (is_flex||is_Center ? 'align-items: center' : '')};
	${({ is_flex,is_Center }) => (is_flex ? 'justify-content: space-between' : is_Center?'justify-content: center':'')};

	${({ overflow }) => (overflow ? 'overflow: hidden' : '')};
`;
