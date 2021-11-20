import { render } from '@testing-library/react';
import { Empty } from '../components/Empty';
 
 


describe('Testing Staff', () => {

    it('Add Testing', () => {
        render(<Empty/>);
        expect(true).toBeTruthy();
    })

})