import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, Image } from '../elements/index';
import { storage } from '../shared/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import styled from 'styled-components';

type UploadProps = {};
const defaultImage = 'images/default-image.jpg';

const Upload = (props: UploadProps) => {
	const fileRef = useRef<HTMLInputElement>(null);
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
		};
	};

	const uploadDB = () => {
		if (!fileRef.current?.files) return;
		const isImage = fileRef.current?.files[0];
		const storageRef = ref(storage, `images/${isImage.name}`);
		uploadBytes(storageRef, isImage).then((snapshot) => {
			console.log(snapshot);
		});
	};

	return (
		<>
			<Image shape='rectangle' src={isPreviewURL} />
			{/* <ImageLabel htmlFor='file' src={isPreviewURL} /> */}
			<input
				type='file'
				id='file'
				ref={fileRef}
				onChange={handleFileOnChange}
			/>
			<Button text='UPLOAD' callback={uploadDB} />
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
