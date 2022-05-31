import styled from 'styled-components';

type ImageProps = {
	shape?: string | undefined;
	src?: string | undefined;
	size?: number | undefined;
};

const Image = (props: ImageProps) => {
	console.log(props);
	const { shape, src, size } = props;
	const styles = {
		src,
		size,
	};
	if (shape === 'circle') {
		return <ImageBox {...styles}></ImageBox>;
	}
	return (
		<AspectOutter>
			<AspectInner {...styles} />
		</AspectOutter>
	);
};

export default Image;

const AspectOutter = styled.div`
	width: 100%;
	min-width: 250px;
`;
const AspectInner = styled.div<{ src?: string }>`
	position: relative;
	padding-top: 75%;
	overflow: hidden;
	background-image: url(${({ src }) => (src ? src : 'none')});
	background-size: cover;
`;
const ImageBox = styled.div<{ src?: string; size?: number }>`
	--size: ${({ size }) => (size ? size + 'px' : '0px')};
	width: var(--size);
	height: var(--size);
	border-radius: var(--size);
	background-image: url(${({ src }) => (src ? src : 'none')});
	background-size: cover;
	margin: 4px;
`;
