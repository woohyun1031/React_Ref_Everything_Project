import { Grid, Text } from '../elements';

const NotLogin = () => {
	return (
		<>
			<Grid margin='100px 0px' padding='16px'>
				<Text size='32px' bold>
					Warning!!
				</Text>
				<Text size='16px'>로그인 후에 글을 작성 할 수 있습니다.</Text>
			</Grid>
		</>
	);
};
export default NotLogin;
