import { Cage } from '@docty68/widget';
import { style } from 'typestyle'
import Login from './pages/Login';

// import './assets/css/icons.min.css';
// import './assets/libs/sweetalert2/sweetalert2.min.css';
// import './assets/libs/select2/css/select2.min.css';

import '@docty68/widget/dist/esm/widget.css'     
import './assets/css/styles.css';

import { Redirect,  BrowserRouter, Switch, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import Staff_Add from './pages/entries/Staff_Add';   
import Staff_List from './pages/entries/Staff_List';
import Staff_Profile from './pages/entries/Staff_Profile';
import Client_Add from './pages/entries/Client_Add';
import Client_List from './pages/entries/Client_List'; 
import Client_Profile from './pages/entries/Client_Profile';
import Guest_List from './pages/entries/Guest_List';
import Guest_Profile from './pages/entries/Guest_Profile';
import Market_List from './pages/market/Market_List';
import Market_Add from './pages/market/Market_Add';
import Market_Profile from './pages/market/Market_Profile';
import Product_List from './pages/product/Product_List';
import Product_Add from './pages/product/Product_Add';
import Product_Profile from './pages/product/Product_Profile';
import Order_List from './pages/order/Order_List';
import Order_Profile from './pages/order/Profile';
import Transaction from './pages/extra/Transaction';
import Transfer from './pages/extra/Transfer';
import Report from './pages/extra/Report';
import Account from './pages/extra/Account';
import Review from './pages/extra/Review';
import Subscribe from './pages/extra/Subscribe';
import Contact from './pages/extra/Contact';
import Custom from './pages/extra/Custom';
import Error_404 from './pages/Error_404';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Product_Report from './pages/product/Product_Report';


const routes = [
  { url: '/v1/dashboard', component: Home, exact: true },
  { url: '/v1/entries/staff/add', component: Staff_Add, exact: true },
  { url: '/v1/entries/staff/list', component: Staff_List, exact: true },
  { url: '/v1/entries/staff/:referencing/profile', component: Staff_Profile, exact: true },
  { url: '/v1/entries/client/add', component: Client_Add, exact: true },
  { url: '/v1/entries/client/list', component: Client_List, exact: true },
  { url: '/v1/entries/client/:referencing/profile', component: Client_Profile, exact: true },
  { url: '/v1/entries/guest/list', component: Guest_List, exact: true },
  { url: '/v1/entries/guest/:referencing/profile', component: Guest_Profile, exact: true },
  { url: '/v1/market/material/list', component: Market_List, exact: true },
  { url: '/v1/market/material/add', component: Market_Add, exact: true },
  { url: '/v1/market/material/:referencing/profile', component: Market_Profile, exact: true },
  { url: '/v1/product/material/list', component: Product_List, exact: true },
  { url: '/v1/product/material/add', component: Product_Add, exact: true }, 
  { url: '/v1/product/material/report', component: Product_Report, exact: true }, 
  { url: '/v1/product/material/:referencing/profile', component: Product_Profile, exact: true },
  { url: '/v1/order/list', component: Order_List, exact: true },
  { url: '/v1/order/:referencing/profile', component: Order_Profile, exact: true },
  { url: '/v1/wallet/transaction', component: Transaction, exact: true },
  { url: '/v1/wallet/transfer', component: Transfer, exact: true },
  { url: '/v1/wallet/payment', component: Transfer, exact: true },
  { url: '/v1/review', component: Review, exact: true },
  { url: '/v1/contact', component: Contact, exact: true },
  { url: '/v1/subscribe', component: Subscribe, exact: true },
  { url: '/v1/custom', component: Custom, exact: true },
  { url: '/v1/report', component: Report, exact: true },
  { url: '/v1/account', component: Account, exact: true },
]


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/login'} component={Login} exact/>
        <Redirect path={'/'} to={'/login'} exact/>
        <Cage className={pageCover} >
          <Header/>
          <Sidebar/>
          <Cage className={pageContent}>
            {
              routes.map((item, index: number) => (
                <Route path={item.url} component={item.component} exact key={index} />
              ))
            }
         </Cage>
        </Cage>
        <Route path={'*'} component={Error_404}/>
      </Switch>
    </BrowserRouter>
  );
}  

const pageCover = style({
  position: 'relative',
})

const pageContent = style({
  marginLeft: '300px',
  marginTop: '60px',
  $nest: {
    "@media screen and (max-width: 768px)" : {
      marginLeft: '0',
        
    }
}
})
export default App;
