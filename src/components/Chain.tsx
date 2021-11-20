import {Children, HTMLAttributes, ReactNode } from "react";
import { style } from 'typestyle';

export const Chain = (props :IChain) => {
    
    
    return(<div className={breadStyling}>
        { 
            Children.toArray(props.item?.map((item, index:number) => (
                <div className={props.state === index ? bk: ''}>{item}</div>
            )))
        }
    </div>
    
    )
}

interface IChain extends Pick<HTMLAttributes<ReactNode>, 'children'  >{
    item?: Array<string>;
    state?: any;
    properties? : {
        activeColor: string;
        inActiveColor: string;
         
    }
}
 

const breadStyling = style({
    display: 'flex',
    background: '#ddd',
    borderRadius: '10px',
    $nest: {
        "&>div" : {
            padding: '1rem',
            display: 'inline-block',
            position: 'relative',
            flex: '1',
            fontWeight: 'bold',
            textAlign: 'center',
            background: '#ddd',
            $nest: {
                "&::after" : {
                    content: `''`, 
                    top: '0', 
                    bottom: '0', 
                    right: '-24px',
                    background: '#ddd',
                    position: 'absolute',
                    width: '50px',
                    zIndex: 2,
                    transform: 'rotate(45deg) scale(0.707)',
                    boxShadow: '1px -1px rgba(0,0,0,0.8)'
                    
                },
                "&:last-child::after": {
                    content: 'none'
                },
                "&:first-child" : {
                    borderRadius: '10px 0 0 10px'
                },
                "&:last-child" : {
                    borderRadius: '0 10px 10px 0'
                }
            }
        }
    }
})

const bk = style({
    background: '#222 !important',
    color: '#fff',
    $nest:{
        "&::after" :{
            background: '#222 !important'
        }
    }
    
})