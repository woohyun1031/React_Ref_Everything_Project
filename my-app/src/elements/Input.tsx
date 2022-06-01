import styled from 'styled-components';
import { Text, Grid } from './index';

type InputProps = {
	label?: string | undefined;
	placeholder?: string | undefined;
	callback?(): any;
	children?: any | undefined;
};

const Input = (props: InputProps) => {
	const { label, placeholder, callback, children } = props;

	return (
		<>
			<Grid padding='10px 0px'>
				<Text>{label}</Text>
				<InputBox placeholder={placeholder} onChange={callback} />
			</Grid>
		</>
	);
};

export default Input;

const InputBox = styled.input`
	border: 1px solid #212121;
	width: 100%;
	padding: 12px 4px;
	box-sizing: border-box;
`;
