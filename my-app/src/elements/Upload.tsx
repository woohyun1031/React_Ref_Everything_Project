import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Image } from '../elements/index';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/configStore';
import { setPreviewUrl } from '../store/modules/image';

type UploadProps = {};
const defaultImage = 'images/default-image.jpg';

const Upload = (props: UploadProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const fileRef = useRef<HTMLInputElement>(null);
	const is_uploading = useSelector((state: RootState) => state.image.uploading);
	const [isPreviewURL, setIsPreviewURL] = useState(defaultImage);

	useEffect(() => {
		console.log(isPreviewURL);
	}, [isPreviewURL]);

	const handleFileOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		if (!event.target.files) return;
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			const csv = reader.result as string;
			setIsPreviewURL(csv);
			dispatch(setPreviewUrl(csv));
		};
	};

	return (
		<>
			<Image shape='rectangle' src={isPreviewURL} />

			<input
				type='file'
				id='file'
				ref={fileRef}
				onChange={handleFileOnChange}
				disabled={!is_uploading}
			/>
		</>
	);
};
export default Upload;

const ImageLabel = styled.label<{ src: string }>`
	background-image: url(${({ src }) => (src ? src : defaultImage)});
	background-position: center center;
	background-repeat: no-repeat;
	background-size: contain;
	width: 250px;
	height: 250px;
	border-radius: 5px;
`;
