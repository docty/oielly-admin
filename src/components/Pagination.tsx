import { Link } from 'react-router-dom';
import { style } from 'typestyle';
import { HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';

const Pagination = (props: IPagination) => {
    const { length, url, className, style, align } = props;
    const defaultLength = 10;
    const loopFactor = Math.ceil(length / defaultLength);
    const arrayLoop = convertNumToArray(loopFactor);

    return (
        <ul className={classnames(['flex', `justify-${align}`, ulStyling])} >
            <li className={liStyling}>
                <Link to={'#'} className={classnames([linkStyling, className])}>
                    <i className={'fa fa-chevron-left'}></i>
                </Link>
            </li>
            
            {
                arrayLoop.map((item) => (
                    <li className={liStyling} key={item}>
                        <Link to={`${url}?page=${defaultLength*item}`} className={classnames([linkStyling, className])} style={style} key={item}>{item}</Link>
                    </li>
                )) 
            }
            
            <li className={liStyling}>
                <Link to={'#'} className={classnames([linkStyling, className])}>
                    <i className={'fa fa-chevron-right'}></i>
                </Link>
            </li>
        </ul>
    )
}

const convertNumToArray = (value: number) => {
    const container:number[] = [];
    for (let index = 1; index <= value; index++) {
         container.push(index);
    }
    return container;
}


const ulStyling = style({
    display: 'flex',
    listStyle: 'none'
})

const liStyling = style({
    margin: '0 0.25rem'
})

const linkStyling = style({
    background: '#e9ecee',
    padding: '0 0.8rem',
    width: '34px',
    height: '34px',
    display: 'block',
    borderRadius: '5px',
    color: '#383e50',
    lineHeight: '34px',
    textAlign: 'center',
    border: '1px solid #dee2e6',
    $nest: {
        "&:hover": {
            background: '#088178',
            color: '#fff'
        }
    }
})

export interface IPagination extends Pick<HTMLAttributes<ReactNode>, 'className' | 'style' >{
    length: number;
    url: string;
    align?: 'start' | 'center' | 'end'
}

export default Pagination