import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import {Router} from 'react-router-dom'
import { createMemoryHistory } from 'history'; 
import MarketAdd from '../pages/market/Market_Add';



describe('Testing Market', () => {

    it('Add Market -> Component on Screen', () => {
        const history = createMemoryHistory();
        render(
        <Router history={history}>
           <MarketAdd/> 
        </Router>);
        const marketName = screen.getByPlaceholderText('Enter Market Name');
        expect(marketName).toBeInTheDocument();
        
        const location = screen.getByPlaceholderText('Enter Location');
        expect(location).toBeInTheDocument();
        
        const employees = screen.getByPlaceholderText('Enter Number of Employees');
        expect(employees).toBeInTheDocument();
        
        const clientId = screen.getByPlaceholderText('Enter Client Identity');
        expect(clientId).toBeInTheDocument();

        const button = screen.getByText(/Save/i)
        expect(button).toBeInTheDocument();
    });

    it('Add Market -> Handling Event', () => {
        const history = createMemoryHistory();
        render(
        <Router history={history}>
           <MarketAdd/> 
        </Router>);
        
        const marketName = screen.getByPlaceholderText('Enter Market Name');
        userEvent.type(marketName, 'Asiedu');
        expect(marketName).toHaveValue('Asiedu')
        
        const location = screen.getByPlaceholderText('Enter Location');
        userEvent.type(location, 'Henry Kwasi');
        expect(location).toHaveValue('Henry Kwasi')
         
        const employees = screen.getByPlaceholderText('Enter Number of Employees');
        userEvent.type(employees, '2');
        expect(employees).toHaveValue(2)
        
         
        const clientId = screen.getByPlaceholderText('Enter Client Identity');
        userEvent.type(clientId, '0240000001');
        expect(clientId).toHaveValue('0240000001')
         
    })

})