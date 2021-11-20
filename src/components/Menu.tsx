import { HTMLAttributes, ReactNode, useState } from 'react';
import classnames from 'classnames';
import { style } from 'typestyle';
import  './menu.css';
import { NavLink } from "react-router-dom";

export const Menu = (props : IMenu) => {
    return(
        <ul className={classnames(['list-none', props.className])} style={props.style}>
            {props.children}
        </ul>
    )
}

export const MenuItem = (props: IMenuItem) => {
	const [subItems, setSub] = useState<string>('0');

    const menuclick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, hasSub?: boolean) => {
        if(!hasSub) return false;
		e.preventDefault();
        console.log(subItems);
        
         if (subItems === '0') {
            setSub('100px');
         }else{
            setSub('0');
         }
        
    }
    return(
        <li className={'mb-3'}>
            <NavLink exact to={props.url} 
                activeClassName={classnames([props.activeClassName, style({background: 'rgba(8, 129, 120, 0.5)',})])} 
                className={menuItemStyling(props.className)} 
                style={props.style}  
                onClick={(e) => menuclick(e, props.hasSub)}
            >
                <i className={classnames(['mr-3',props.icon])} ></i>
                <span>{props.text}</span>
                {props.hasSub && <i className={classnames(['fa fa-chevron-left', subMenuIconStyling])} ></i>}
            </NavLink>
            {props.hasSub && <div style={{maxHeight: subItems,overflowY: 'hidden'}} className={subMenuItemStyling(props.className)}>{props.children}</div>}
        </li>
    ) 
}

export const MenuSub = (props:IMenuSub) => {
    return(
        <NavLink to={props.url} className={classnames(['block', 'p-1', 'mt-2'])}>{props.text}</NavLink>
    ) 
}  

const menuItemStyling = (className?: string) => {
    return classnames([
        'p-3',
        'relative',
        style({
            color: '#fff',
            borderRadius: '5px',
            display: 'block',
            $nest: {
                "&:hover" : {
                    background: 'rgba(8, 129, 120, 0.2)'
                }
            }
        }),
        className

    ])
}

const subMenuIconStyling = style({
    position: 'absolute',
    right: '15px',
})

const subMenuItemStyling = (className?: string) => {
    return classnames([
        'ml-12', 
        'animate',
        className
    ])
}
 

export interface IMenu extends IDefault {}

export interface IMenuItem extends IDefault {
    text?: string;
    url: string;
    icon?: string;
    hasSub?: boolean;
	activeClassName?: string; 
}

export interface IMenuSub extends IDefault {
    url: string;
    text?: string;
}


export interface IDefault extends  Pick<HTMLAttributes<ReactNode>, 'children' | 'className' | 'style'> {}