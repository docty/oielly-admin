import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import {Router} from 'react-router-dom'
import { createMemoryHistory } from 'history';
import ClientAdd from '../pages/entries/Client_Add';



describe('Testing Client', () => {

    it('Add Client -> Component on Screen', () => {
        const history = createMemoryHistory();
        render(
        <Router history={history}>
           <ClientAdd/> 
        </Router>);
        const surname = screen.getByPlaceholderText('Enter Surname');
        expect(surname).toBeInTheDocument();
        
        const otherName = screen.getByPlaceholderText('Enter Other Name');
        expect(otherName).toBeInTheDocument();
        
        const email = screen.getByPlaceholderText('Enter Email');
        expect(email).toBeInTheDocument();
        
        const contact = screen.getByPlaceholderText('Enter Contact');
        expect(contact).toBeInTheDocument();

        const button = screen.getByText(/Save/i)
        expect(button).toBeInTheDocument();
    });

    it('Add Client -> Handling Event', () => {
        const history = createMemoryHistory();
        render(
        <Router history={history}>
           <ClientAdd/> 
        </Router>);
        
        const surname = screen.getByPlaceholderText('Enter Surname');
        userEvent.type(surname, 'Asiedu');
        expect(surname).toHaveValue('Asiedu')
        
        const otherName = screen.getByPlaceholderText('Enter Other Name');
        userEvent.type(otherName, 'Henry Kwasi');
        expect(otherName).toHaveValue('Henry Kwasi')
         
        const email = screen.getByPlaceholderText('Enter Email');
        userEvent.type(email, 'admin@test.com');
        expect(email).toHaveValue('admin@test.com')
        
         
        const contact = screen.getByPlaceholderText('Enter Contact');
        userEvent.type(contact, '0240000001');
        expect(contact).toHaveValue('0240000001')
         
    })

})