import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RedirectPage = () => {
	const { id: redirectId } = useParams();

	useEffect(() => {
		console.log(redirectId);
		if (redirectId) window.location.replace(redirectId);
	}, []);

	return (
		<div>
			<h3>Redirecting...</h3>
		</div>
	);
};

export default RedirectPage;
