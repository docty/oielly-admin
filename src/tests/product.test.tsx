import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import {Router} from 'react-router-dom'
import { createMemoryHistory } from 'history';  
import ProductAdd from '../pages/product/Product_Add';



describe('Testing Product', () => {

    it('Add Product -> Component on Screen', () => {
        const history = createMemoryHistory();
        render(
        <Router history={history}>
           <ProductAdd/> 
        </Router>);
        const materialName = screen.getByPlaceholderText('Enter Material Name');
        expect(materialName).toBeInTheDocument();
        
        const manufacturer = screen.getByPlaceholderText('Enter Manufacturer Brand');
        expect(manufacturer).toBeInTheDocument();
        
        const price = screen.getByPlaceholderText('Enter Price');
        expect(price).toBeInTheDocument();
        
        const quantity = screen.getByPlaceholderText('Enter Quantity');
        expect(quantity).toBeInTheDocument();

        const description = screen.getByPlaceholderText('Enter Description');
        expect(description).toBeInTheDocument();

        const button = screen.getByText(/Next/i)
        expect(button).toBeInTheDocument();
    });

    it('Add Market -> Handling Event', () => {
        const history = createMemoryHistory();
        render(
        <Router history={history}>
           <ProductAdd/> 
        </Router>);
        
        const materialName = screen.getByPlaceholderText('Enter Material Name');
        userEvent.type(materialName, 'Asiedu');
        expect(materialName).toHaveValue('Asiedu')
        
        const manufacturer = screen.getByPlaceholderText('Enter Manufacturer Brand');
        userEvent.type(manufacturer, 'Henry Kwasi');
        expect(manufacturer).toHaveValue('Henry Kwasi')
         
        const price = screen.getByPlaceholderText('Enter Price');
        userEvent.type(price, '2.00');
        expect(price).toHaveValue('2.00')
        
         
        const quantity = screen.getByPlaceholderText('Enter Quantity');
        userEvent.type(quantity, '25');
        expect(quantity).toHaveValue(25)

        const description = screen.getByPlaceholderText('Enter Description');
        userEvent.type(description, 'This is the best product ever for all events');
        expect(description).toHaveValue('This is the best product ever for all events')
         
    })

})