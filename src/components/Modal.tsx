import { HTMLAttributes, ReactNode } from 'react'
import { style } from 'typestyle'
import classnames from 'classnames';

const Modal = (props: IModal) => {
	if (props.isOpen) {
		return (
			<div className={modalWrapper} id={props.id}>
				<div className={classnames([modelContainer, props.className])}>
					<i className={['icon-cross', iconCross].join(' ')} onClick={props.setOpen}></i>
					<h5 className={'font-bold text-base mb-3 mr-5'} style={props.style}>{props.title}</h5>

					{props.children}
				</div>
			</div>
		)
	} else { return <></> }
};

const modalWrapper = style({
	position: 'fixed',
	background: 'rgba(0,0,0,0.8)',
	top: '0',
	left: '0',
	right: '0',
	bottom: '0',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	zIndex: 5
})

const modelContainer = style({
	background: 'white',
	marginTop: '0rem',
	top: '-10%',
	padding: '0.9rem',
	borderRadius: '5px',
	minWidth: '350px',
	maxWidth: '500px',
	position: 'relative',
});

const iconCross = style({
	position: 'absolute',
	right: '10px',
	top: '16px',
	fontSize: '1.3rem',
	cursor: 'pointer',
})

interface IModal extends Pick<HTMLAttributes<ReactNode>, 'children' | 'className' | 'style' | 'id'> {
	title?: string;
	isOpen?: boolean;
	setOpen?: () => void
}
export default Modal;
