import styled from 'styled-components';

type ButtonProps = {
	text?: string;
	callback?(): any;
	width?: string;
	margin?: string;
};

const Button = (props: ButtonProps) => {
	const { text, callback, width, margin } = props;
	const styles = {
		width,
		margin,
	};
	return (
		<ButtonBox {...styles} onClick={callback}>
			{text}
		</ButtonBox>
	);
};

export default Button;

const ButtonBox = styled.button<{ width?: string; margin?: string }>`
	width: ${({ width }) => (width ? width : '100%')};
	margin: ${({ margin }) => (margin ? margin : '0px')};
	background-color: #212121;
	color: #ffffff;
	padding: 12px 0px;
	box-sizing: border-box;
	border: none;
`;
