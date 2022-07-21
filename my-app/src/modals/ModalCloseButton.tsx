import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RiCloseFill } from 'react-icons/ri';
import { RootState } from '../store/configStore';

type ButtonProps = {
	top: string;
	right: string;
	callback?(event: any): any;
};

const ModalCloseButton = (props: ButtonProps) => {
	const { top, right, callback } = props;
	const isDark = useSelector((state: RootState) => state.user.isDark);

	return (
		<CloseButton onClick={callback} isDark={isDark} top={top} right={right}>
			<RiCloseFill />
		</CloseButton>
	);
};

export default ModalCloseButton;

const CloseButton = styled.div<{ isDark: boolean; top: string; right: string }>`
	cursor: pointer;
	position: absolute;
	color: ${({ isDark }) => (isDark ? 'white' : '')};
	top: ${({ top }) => top};
	right: ${({ right }) => right};
`;
