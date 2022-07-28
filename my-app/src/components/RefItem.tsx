import styled from 'styled-components';
import { Grid, Image, Text } from '../elements/index';
import { textLengthOverCut } from '../shared/common';
import { removeItem } from '../store/modules/item';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/configStore';
import { RiMenuLine } from 'react-icons/ri';
import { MouseEvent, useEffect, useState } from 'react';

export type ItemType = {
	id?: string;
	component_id?: string;
	image_url?: string;
	item_url?: string;
	title?: string;
	contents?: string;
	insert_dt?: number;
};

const RefItem = (props: ItemType) => {
	const { id, component_id, image_url, item_url, title, contents } = props;
	const dispatch = useDispatch<AppDispatch>();
	const [isShow, setIsShow] = useState(false);

	const [isOpen, setIsOpen] = useState(false);
	const [isStatic, setIsStatic] = useState(true);

	useEffect(() => {
		if (!isStatic) {
			setTimeout(() => {
				setIsOpen(false);
				setIsStatic(true);
			}, 200);
		}
	}, [isStatic]);

	const toggleDropDown = () => {
		if (isOpen) {
			setIsStatic(false);
		} else {
			setIsOpen(true);
		}
	};

	const ItemRemoveClick = () => {
		if (confirm('Are you sure delete Item?')) {
			if (id && component_id) {
				const postInfo = { id, component_id };
				dispatch(removeItem(postInfo));
			}
		}
	};

	return (
		<>
			<RefItemBox
				href={item_url}
				target='_blank'
				rel='noopener noreferrer'
				onMouseOver={() => setIsShow(true)}
				onMouseLeave={() => {
					console.log('d');
					setIsShow(false);
					setIsStatic(false);
				}}
			>
				<Icon
					onClick={(e: MouseEvent<HTMLDivElement>) => {
						e.preventDefault();
						toggleDropDown();
					}}
					isShow={isShow}
				>
					<RiMenuLine viewBox='0 0 30 30' />
				</Icon>
				<Grid margin='10px' width='200px' height='80px' bg is_flex border>
					<Grid bg padding='10px'>
						<Image shape={'profile_rectangle'} src={image_url} size={25} />
					</Grid>
					<Grid bg padding='10px' overflow>
						<Text size='8px' margin='5px 0px' bold>
							{title}
						</Text>
						<Text size='5px'>{contents && textLengthOverCut(contents)}</Text>
					</Grid>
				</Grid>
				<Menu isOpen={isOpen} isStatic={isStatic}>
					<li>정보</li>
					<li
						onClick={(e: MouseEvent<HTMLLIElement>) => {
							e.preventDefault();
							ItemRemoveClick();
						}}
					>
						삭제
					</li>
				</Menu>
			</RefItemBox>
		</>
	);
};

export default RefItem;

const RefItemBox = styled.a`
	position: relative;
	text-decoration: none;
	transition: 0.3s;
	cursor: pointer;
	&:hover {
		z-index: 9999;
		transform: translateY(-2px);
		filter: drop-shadow(3px 4px 7px rgba(0, 0, 0, 0.3));
	}
`;

const Icon = styled.div<{ isShow: boolean }>`
	${({ isShow }) => !isShow && 'display:none'};
	cursor: pointer;
	position: absolute;
	color: ${({ theme }) => theme.colors.title};
	transition: 0.5s;
	top: 12px;
	right: 10px;
`;

const Menu = styled.ul<{ isOpen: boolean; isStatic: boolean }>`
	${({ isOpen }) => !isOpen && 'display:none'};
	width: 58px;
	height: 65px;
	border-radius: 7px;
	padding: 5px;
	font-size: 13px;
	font-weight: 400;
	top: 10px;
	right: -55px;
	background-color: ${({ theme }) => theme.colors.background};
	box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
	background-position: center center;
	background-repeat: no-repeat;

	animation-duration: 0.2s;
	animation-timing-function: ease-out;
	animation-fill-mode: forwards;
	${({ isStatic }) =>
		isStatic ? 'animation-name: slideUp' : 'animation-name: slideDown'};

	@keyframes slideUp {
		from {
			transform: translateX(-15px);
			opacity: 0;
		}
		to {
			transform: translateX(0px);
			opacity: 1;
		}
	}
	@keyframes slideDown {
		from {
			transform: translateX(0px);
			opacity: 1;
		}
		to {
			transform: translateX(-15px);
			opacity: 0;
		}
	}

	& li {
		color: ${({ theme }) => theme.colors.title};
		width: 100%;
		text-align: center;
		margin: 0px auto 3px auto;
		cursor: pointer;
		padding: 4px 0;
		:hover {
			filter: brightness(85%);
		}
	}
	& li:nth-child(2) {
		color: ${({ theme }) => theme.colors.reject};
		border-top: 1px solid ${({ theme }) => theme.colors.subTitle};
	}
	position: absolute;
	z-index: 101;
`;
