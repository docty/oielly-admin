import logo from '../assets/images/logo-light.png';
import { Card, Paragraph, Icon, Avatar, Button, Image, Cage, Flexbox, Grid, } from '@docty68/widget';
import { Link } from 'react-router-dom';
import { style } from 'typestyle';
import * as css from '../utility/styling'
import classnames from 'classnames'
const Header = () => {

	const barClick = () => {
		const el = document.getElementById('sidebar') as HTMLDivElement;
		el.style.width = '18rem';
	}

	const arrowDown = () => {
		const el = document.getElementById('profileDropdown') as HTMLDivElement;
		el.classList.toggle('hidden');
	}
    return (
        <Cage className={wrapperStyling} >
            <Grid className={siderHeader}>
                <Flexbox alignItems={'center'}>
					<Link to={'/v1/dashboard'} style={{flex: '1'}}>
						<Image source={logo} alt={'Oielly'} style={{width: '80%'}} />
					</Link>
				</Flexbox>
				<Cage></Cage>
				<Flexbox  className={'relative cursor-pointer'} onClick={arrowDown} alignItems={'center'}>
					<Avatar text={'kk'} iconSize={'30'} className={'mx-1'} />
					<Paragraph text={'Henry'} className={classnames(css.hideOnMobile, 'mx-1 py-2 text-white')}/>
					<div className={'py-2'}>
						<Icon className={'icon-arrow-down5'} name={'icon-arrow-down5'}  />
					</div>
					<Card className={classnames(['hidden',dropDown])} id={'profileDropdown'} >
						<Link to={'/v1/profile'} className={'block'}>
							<Icon className={'icon-user'} name={'icon-user'}/>
							<span className={'mx-2 my-2'}>Profile</span>
						</Link>
						<Link to={'/v1/logout'}>
							<Icon className={'icon-exit3'} name={'icon-exit3'}/>
							<span className={'mx-2 my-2'}>Logout</span>
						</Link>
					</Card>
				</Flexbox>
				<Button  icon={'icon-menu7'} className={barIcon} onClick={barClick} />
            </Grid>
        </Cage>
        
    )
}

const wrapperStyling = style({
    padding: '0.5rem',
    background: '#222',
    position: 'fixed',
    minHeight: '60px',
    right: '0',
    left: '0',
    top: '0',
    zIndex: 200
})

const siderHeader = style({
	gridTemplateColumns: '13rem 1fr auto auto'
})

const barIcon = style({
	display: 'none',
	background: 'unset',
	$nest: {
		"&:hover": {
			borderRadius: '0',
			background: '#333'
		},
        "@media screen and (max-width: 768px)" : {
            display: 'block',  
        }
    }
})

const dropDown = style({
	position: 'absolute',
	left: '0',
	right: '0',
	top: '53px',
	zIndex: 500,
	padding: '0.5rem',
	$nest: {
		"&>a" : {
			padding: '0.5rem 0',
			display: 'block'
		}
	}
	
})
export default Header;