import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Text, Grid } from './index';

type TextAreaProps = {
	name?: string;
	value?: string;
	label?: string;
	placeholder?: string;
	callback?(value: ChangeEvent<HTMLTextAreaElement>): any;
};

const TextArea = (props: TextAreaProps) => {
	const { label, placeholder, callback, value, name } = props;
	return (
		<>
			<Grid padding='10px 0px'>
				<Text>{label}</Text>
				<TextAreaBox
					rows={10}
					onChange={callback}
					name={name}
					value={value}
					placeholder={placeholder}
				/>
			</Grid>
		</>
	);
};

export default TextArea;

const TextAreaBox = styled.textarea`
	resize: none;
	border: 1px solid #212121;
	width: 100%;
	padding: 12px 4px;
	box-sizing: border-box;
`;
