import React/*,{ useState }*/ from 'react';
//import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import propTypeError from '../../utils/prop-type-error';
import DropdownMenu from './DropdownMenu';

const REQUIRED_PROPS = {
    items:{
        test:'string',
        },
    value:'test',
    name: "Optimisation Algo" 
    };

describe('Should use Prop-Types to type check inputs', () =>
{
    it('Test there are no more required props than expected', () =>
    {
        console.error = propTypeError;
        render(<DropdownMenu {...REQUIRED_PROPS} />);
    })

    
    for(const prop in REQUIRED_PROPS)
    {
        it('Test all required props are required', () => 
        {
            let oneReqPropMissing = {...REQUIRED_PROPS};
            delete oneReqPropMissing[prop];
            expect(() => {render(<DropdownMenu {...oneReqPropMissing} />)}).toThrowRequiredPropError(prop);
        })
    };
});

describe('Expect Dropdown to render correctly', ()=>
{
    it('Should render a button next to the label that will open the dropdown menu', ()=>
    {
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    })

    it('Should render down pointing arrow', () => 
    {
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        expect(screen.getByText("\u25BC")).toBeInTheDocument();
    })

    it('Should render the name of the object passed to it in props', () =>
    {
        const regex = new RegExp(REQUIRED_PROPS.name, 'i');
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        expect(screen.getByText(regex)).toBeInTheDocument();
    })

    it('Should render a label that has the text of a key in Items', ()=>
    {
        const regex = new RegExp(REQUIRED_PROPS.value, 'i');
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        expect(screen.getByText(regex)).toBeInTheDocument();
    })
})