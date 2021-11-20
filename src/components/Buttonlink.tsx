import classnames from 'classnames';
import { style  } from 'typestyle';
import { CSSProperties, HTMLAttributes } from 'react';

export const Button = (props: IButton) => {
     
    
    //const rr = useRef()
    return (
        <button 
            type="button" 
            style={props.style}
            className={styling(props)}
            onClick={props.click}
			ref={props.ref}
        >
            {props.icon &&  (<i className={props.icon}></i>) }
            {props.text && (<span className={'px-1'}>{props.text}</span>)}
        </button>
        
    );
};
const styling = (props: IButton) => {
    const { bgColor } = props;
    return classnames([
        `bg-${bgColor}-400`, 
        `hover:bg-${bgColor}-300`,
        style({color: '#fff', padding: '0.1rem 0.35rem', borderRadius: '5px'}),
        props.className
    ]);
} 

 
export interface IButton extends Pick<HTMLAttributes<React.ReactNode>, 'children' | 'className'> {
    bgColor?: 'blue' | 'green' | 'pink' | 'red',
    text?: string;
    fullWidth?: boolean;
    click?: () => void;
    icon?: string;
    trailing?: 'left' | 'right';
    style?: CSSProperties ;
	ref: (e:any) => void;
}


Button.defaultProps = {
    bgColor: 'blue'
}