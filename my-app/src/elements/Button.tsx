import styled from 'styled-components';

type ButtonProps = {
	text?: string | undefined;
	callback?(): any;
};

const Button = (props: ButtonProps) => {
	const { text, callback } = props;

	return <ButtonBox onClick={callback}>{text}</ButtonBox>;
};

export default Button;

const ButtonBox = styled.button`
	width: 100%;
	background-color: #212121;
	color: #ffffff;
	padding: 12px 0px;
	box-sizing: border-box;
	border: none;
`;
