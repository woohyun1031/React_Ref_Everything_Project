import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configStore';
import { closeModal } from '../store/modules/modal';
import styled from 'styled-components';
import AddItem from './AddItem';
import AddComponent from './AddComponent';
import { useEffect, useState } from 'react';
import ModalCloseButton from './ModalCloseButton';
import MyPage from './MyPage';

const modalRoot = document.querySelector('#modal') as HTMLElement;

const Modal = () => {
	const dispatch = useDispatch();
	const modal = useSelector((state: RootState) => state.modal);
	const [isStatic, setIsStatic] = useState(true);

	useEffect(() => {
		if (!isStatic) {
			setTimeout(() => {
				dispatch(closeModal());
				setIsStatic(true);
			}, 150);
		}
	}, [isStatic]);

	let contents: JSX.Element | null;
	switch (modal.type) {
		case 'addItem':
			contents = <AddItem />;
			break;
		case 'addComponent':
			contents = <AddComponent />;
			break;
		case 'myPage':
			contents = <MyPage />;
			break;
		default:
			contents = null;
	}

	const isClose = () => {
		setIsStatic(false);
		// if (confirm('정말로 취소하시겠습니까?')) {
		// }
	};

	if (!modal.isOpen) return null;

	return createPortal(
		<Background onClick={isClose} isOpen={isStatic}>
			<Contents onClick={(e) => e.stopPropagation()} isOpen={isStatic}>
				<ModalCloseButton callback={isClose} top={'30px'} right={'30px'} />
				{contents}
			</Contents>
		</Background>,
		modalRoot
	);
};

export default Modal;

const Background = styled.div<{ isOpen: boolean }>`
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	${({ theme }) => theme.commons.blur_background};
	z-index: 10000;
	animation-duration: 0.15s;
	animation-timing-function: ease-out;
	animation-fill-mode: forwards;
	${({ isOpen }) =>
		isOpen ? 'animation-name: fadeIn;' : 'animation-name: fadeOut'};

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
`;

const Contents = styled.div<{ isOpen: boolean }>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.background};
	border-radius: 10px;
	box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.15);
	z-index: 1001;
	animation-duration: 0.15s;
	animation-timing-function: ease-out;
	animation-fill-mode: forwards;
	${({ isOpen }) =>
		isOpen ? 'animation-name: slideUp' : 'animation-name: slideDown'};
	@keyframes slideUp {
		from {
			transform: translateY(-100px);
		}
		to {
			transform: translateY(0px);
		}
	}
	@keyframes slideDown {
		from {
			transform: translateY(0px);
		}
		to {
			transform: translateY(-100px);
		}
	}
`;
