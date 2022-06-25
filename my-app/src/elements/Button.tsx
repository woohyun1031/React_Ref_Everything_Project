import styled from 'styled-components';

type ButtonProps = {
	text?: string;
	callback?(): any;
	width?: string;
	height?: string;
	margin?: string;
};

const Button = (props: ButtonProps) => {
	const { text, callback, width, height, margin } = props;
	const styles = {
		width,
		height,
		margin,
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
}>`
	width: ${({ width }) => (width ? width : '100%')};
	height: ${({ height }) => (height ? height : '80%')};
	margin: ${({ margin }) => (margin ? margin : '0px')};
	background-color: #738cff;
	color: #ffffff;
	padding: 12px 0px;
	box-sizing: border-box;
	border: none;
	border-radius: 10px;
`;
