import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Image, Text } from '../elements/index';
import { displayDate } from '../shared/common';
import { RootState } from '../store/configStore';

type PostProps = {
	id?: string;
	component_id?: string;
	image_url?: string;
	item_url?: string;
	title?: string;
	contents?: string;
	insert_dt?: number;
};

const RefItem = (props: PostProps) => {
	const { id, component_id, image_url, item_url, title, contents, insert_dt } =
		props;
	const navigate = useNavigate();
	const userDafaultImgae = 'images/man_default_image.png';
	return (
		<>
			<RefItemBox href={item_url} target='_blank' rel='noopener noreferrer'>
				<Grid margin='10px' width='200px' height='80px' bg is_flex is_shadow>
					<Grid bg padding='10px'>
						<Image shape={'profile_rectangle'} src={image_url} size={30} />
					</Grid>
					<Grid bg padding='10px'>
						<Text size='8px' margin='5px 0px' bold>
							{title}
						</Text>
						<Text size='5px'>{contents}</Text>
					</Grid>
				</Grid>
			</RefItemBox>
		</>
	);
};

export default RefItem;

const RefItemBox = styled.a`
	text-decoration: none;
	cursor: pointer;
`;
