import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configStore';
import { closeModal } from '../store/modules/modal';
import styled from 'styled-components';
import AddItem from './AddItem';
import AddComponent from './AddComponent';

const modalRoot = document.querySelector('#modal') as HTMLElement;

type ModalProps = {
	isDark: boolean;
};

const Modal = (props: ModalProps) => {
	const dispatch = useDispatch();
	const modal = useSelector((state: RootState) => state.modal);

	let contents: JSX.Element | null;
	switch (modal.type) {
		case 'addItem':
			contents = <AddItem />;
			break;
		case 'addComponent':
			contents = <AddComponent />;
			break;
		default:
			contents = null;
	}

	const isClose = () => {
		dispatch(closeModal());
	};

	if (!modal.isOpen) return null;

	return createPortal(
		<Background onClick={isClose} isOpen={modal.isOpen}>
			<Contents onClick={(e) => e.stopPropagation()} isOpen={modal.isOpen}>
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
	animation-duration: 0.25s;
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
	animation-duration: 0.25s;
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
