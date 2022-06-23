import styled from 'styled-components';

type FloatButtonProps = {
	callback?(): any;
};

const FloatButton = (props: FloatButtonProps) => {
	return <FloatButtonBox onClick={props.callback}>+</FloatButtonBox>;
};

export default FloatButton;

const FloatButtonBox = styled.button`
	width: 80px;
	height: 80px;
	border-radius: 80px;
	text-align: center;
	vertical-align: middle;
	border: none;
	background-color: #212121;
	color: #ffffff;
	box-sizing: border-box;
	font-size: 50px;
	font-weight: 800;
	position: fixed;
	bottom: 50px;
	right: 20px;
`;
