import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Text, Grid } from './index';

type InputProps = {
	name?: string;
	type?: string;
	value?: string;
	label?: string;
	placeholder?: string;
	callback?(value: ChangeEvent<HTMLInputElement>): any;
};

const Upload = (props: InputProps) => {
	const { label, placeholder, callback, value, type, name } = props;

	return (
		<>
			<input type='file' />
		</>
	);
};

export default Upload;

const InputBox = styled.input`
	border: 1px solid #212121;
	width: 100%;
	padding: 12px 4px;
	box-sizing: border-box;
`;
