import styled from 'styled-components';

type ButtonProps = {
	text?: string;
	callback?(): any;
	width?: string;
	height?: string;
	margin?: string;
	font_size?: string;
	font_color?: string;
	is_bold?: boolean;
};

const Button = (props: ButtonProps) => {
	const {
		text,
		callback,
		width,
		height,
		margin,
		font_size,
		is_bold,
		font_color,
	} = props;
	const styles = {
		width,
		height,
		margin,
		font_size,
		is_bold,
		font_color,
	};
	return (
		<ButtonBox {...styles} onClick={callback}>
			{text}
		</ButtonBox>
	);
};

export default Button;

const ButtonBox = styled.button<{
	width?: string;
	height?: string;
	margin?: string;
	font_size?: string;
	font_color?: string;
	is_bold?: boolean;
}>`
	width: ${({ width }) => (width ? width : '100%')};
	height: ${({ height }) => (height ? height : '80%')};
	margin: ${({ margin }) => (margin ? margin : '0px')};
	font-size: ${({ font_size }) => (font_size ? font_size : '10px')};
	font-weight: ${({ is_bold }) => (is_bold ? '600' : '400')};
	background-color: ${({ theme }) => theme.colors.button_background};
	transition: 0.2s;
	color: ${({ theme, font_color }) =>
		font_color ? theme.colors[font_color] : theme.colors.subTitle};
	padding: 12px 0px;
	box-sizing: border-box;
	border: none;
	box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.15);
	&:hover {
		filter: brightness(115%);
	}
	&:active {
		filter: brightness(85%);
	}
	//border-radius: 10px;
`;
