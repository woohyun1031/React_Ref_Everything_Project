import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configStore';
import { closeModal } from '../store/modules/modal';
import styled from 'styled-components';
import AddItem from './AddItem';

const modalRoot = document.querySelector('#modal') as HTMLElement;

const Modal = () => {
	const dispatch = useDispatch();
	const modal = useSelector((state: RootState) => state.modal);
	let contents;
	let isCanClose = true;

	switch (modal.type) {
		case 'addItem':
			contents = <AddItem />;
			break;
		default:
			contents = null;
	}

	if (!modal.isOpen) return null;

	return createPortal(
		<Background
			onClick={() => {
				if (isCanClose) {
					dispatch(closeModal());
				}
			}}
		>
			<Contents onClick={(e) => e.stopPropagation()}>{contents}</Contents>
		</Background>,
		modalRoot
	);
};

export default Modal;

const Background = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(5px);
	z-index: 10000;
`;

const Contents = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.background};
	border-radius: 10px;
	box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.15);
	z-index: 1001;
`;
