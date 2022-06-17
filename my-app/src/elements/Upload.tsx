import { ChangeEvent, useRef, useState } from 'react';
import { Button } from '../elements/index';
import { storage } from '../shared/firebase';
import { ref, uploadBytes } from 'firebase/storage';

type UploadProps = {};

const Upload = (props: UploadProps) => {
	const fileRef = useRef<HTMLInputElement>(null);

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
			<input type='file' ref={fileRef} />
			<Button text='UPLOAD' callback={uploadDB} />
		</>
	);
};

export default Upload;
