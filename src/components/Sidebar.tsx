import { Button,  Cage, MenuSub } from "@synevix/react-widget";
import { Menu, MenuItem } from './Menu'
import { style } from 'typestyle';
import {  useRef } from 'react';


const Sidebar = () => {
    return(
    <>
        <Cage className={wrapperStyling}>
            <Menus/>
        </Cage>
        
         <MobileSider/>
    </>
)}


   

export default Sidebar;

const MobileSider = () => {
    let crossRef = useRef<any>();
    const closeBtn = () => {
        const element = crossRef.current as HTMLButtonElement;
        console.log(crossRef.current);
        element.style.width = '0'
    } 
    return(
        <div id={'sidebar'} ref={crossRef} className={mobileWrapper}>
            <Cage className={'relative'}>
				<Button onClick={closeBtn}  className={crossStyling} icon={'icon-cross2'} />
			</Cage>
			<Cage style={{marginTop: '3.6rem', overflow: 'hidden'}}>
				<Menus/>
			</Cage>
		</div>
    )
}

const Menus = () => (
	<Menu>
		<MenuItem url={'/v1/dashboard'} text={'Dashboard'} icon={'icon-home2'} />
		<MenuItem url={''} text={'Entries'} icon={'icon-users '} hasSub>
			<MenuSub url={'/v1/entries/staff/list'} text={'Staff'}/>
			<MenuSub url={'/v1/entries/client/list'} text={'Client'}/>
			<MenuSub url={'/v1/entries/guest/list'} text={'Guest'}/>
		</MenuItem>
		<MenuItem url={''} text={'Service'} icon={'icon-fan'} hasSub>
			<MenuSub url={'/v1/market/material/list'} text={'Market'} />
			<MenuSub url={'/v1/product/material/list'} text={'Product'}/>
		</MenuItem>
		<MenuItem url={'/v1/order/list'} text={'Orders'} icon={'icon-cart5 '} />
		<MenuItem url={'/v1/transaction'} text={'Wallet'} icon={'icon-stats-bars2'} hasSub>
            <MenuSub url={'/v1/wallet/transaction'} text={'Transactions'} />
            <MenuSub url={'/v1/wallet/transfer'} text={'Transfer'} />
            <MenuSub url={'/v1/wallet/payment'} text={'Payment'} />
        </MenuItem>
		<MenuItem url={'/v1/review'} text={'Review'} icon={'icon-file-text '} />
        <MenuItem url={'/v1/contact'} text={'Contact'} icon={'icon-file-text '} />
        <MenuItem url={'/v1/subscribe'} text={'Subscribe'} icon={'icon-file-text '} />
        <MenuItem url={'/v1/custom'} text={'Custom'} icon={'icon-file-text '} />
	</Menu>
)

const wrapperStyling = style({
    position: 'fixed',
    top: '60px',
    width: '300px',
    background: '#222',
    color: '#fff',
    padding: '0.5rem',
    overflow: 'hidden',
    left: '0',
    bottom: '0',
    $nest: {
        "@media screen and (max-width: 768px)" : {
            background: 'blue',
            display: 'none'
            
        }
    }
})
const mobileWrapper = style({
    background: '#000',
    height: '100vh',
    position: 'fixed',
    width: '0',
	top: '0',
	bottom: '0',
    zIndex: 10,
	transition: 'width 0.5s'
})

const crossStyling = style({
    background: 'unset',
    position: 'absolute',
    right: '0',
	padding: '1rem',
	$nest: {
		"&:hover": {
			background: '#333'
		}
	}
})
