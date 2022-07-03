import styled from 'styled-components';

type ImageProps = {
	shape?: string;
	src?: string;
	size?: number;
	callback?(): any;
	margin?: string;
};

const defaultImage = 'images/default-image.jpg';
const Image = (props: ImageProps) => {
	const { shape, src, size, margin, callback } = props;
	const styles = {
		src,
		size,
		margin,
	};
	if (shape === 'circle') {
		return <CircleImageBox {...styles}></CircleImageBox>;
	} else if (shape === 'profile_rectangle') {
		return <ImageBox {...styles}></ImageBox>;
	}
	return (
		<AspectOutter onClick={callback}>
			<AspectInner {...styles} />
		</AspectOutter>
	);
};

export default Image;

const AspectOutter = styled.div`
	width: 100%;
	min-width: 200px;
	cursor: pointer;
`;
const AspectInner = styled.div<{ src?: string }>`
	position: relative;
	padding-top: 75%;
	overflow: hidden;
	background-image: url(${({ src }) => (src ? src : 'none')});
	background-size: contain;
	background-position: center center;
	background-repeat: no-repeat;
`;
const CircleImageBox = styled.div<{
	src?: string;
	size?: number;
	margin?: string;
}>`
	--size: ${({ size }) => (size ? size + 'px' : '0px')};
	width: var(--size);
	height: var(--size);
	border-radius: var(--size);
	background-image: url(${({ src }) => (src ? src : defaultImage)});
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	margin-right: 7px;
`;

const ImageBox = styled.div<{ src?: string; size?: number; margin?: string }>`
	--size: ${({ size }) => (size ? size + 'px' : '0px')};
	width: var(--size);
	height: var(--size);
	background-image: url(${({ src }) => (src ? src : defaultImage)});
	background-size: contain;
	background-position: center center;
	background-repeat: no-repeat;
	margin-right: 7px;
`;
