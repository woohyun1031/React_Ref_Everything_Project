import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { closeModal } from '../store/modules/modal';
import { RiCloseFill } from 'react-icons/ri';
import { RootState } from '../store/configStore';

const ModalCloseButton = () => {
	const dispatch = useDispatch();
	const isDark = useSelector((state: RootState) => state.user.isDark);
	const onClick = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		setTimeout(() => dispatch(closeModal()), 250);
	};

	return (
		<CloseButton onClick={onClick} isDark={isDark}>
			<RiCloseFill />
		</CloseButton>
	);
};

export default ModalCloseButton;

const CloseButton = styled.div<{ isDark: boolean }>`
	cursor: pointer;
	position: absolute;
	color: ${({ isDark }) => (isDark ? 'white' : '')};
	top: 30px;
	right: 30px;
`;
