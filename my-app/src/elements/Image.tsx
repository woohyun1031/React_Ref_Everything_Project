import styled from 'styled-components';

type ImageProps = {
	shape: string;
	src: string;
	size: number;
};

const Image = (props: ImageProps) => {
	const { shape, src, size } = props;
	const styles = {
		src,
		size,
	};
	if (shape === 'circle') {
		return <ImageBox {...styles}></ImageBox>;
	} else if (shape === 'rectangle') {
		return <ImageBox {...styles}></ImageBox>;
	}
};

export default Image;

const ImageBox = styled.div<{ src: string; size: number }>`
	--size: ${({ size }) => size + 'px'};
	width: var(--size);
	height: var(--size);
	border-radius: var(--size);
	background-image: url(${({ src }) => src});
	background-size: cover;
	margin: 4px;
`;
