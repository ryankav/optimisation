import React, { useState } from 'react';
import { axe } from 'jest-axe';
import { render, screen, waitFor, Simulate } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import propTypeError from '../../utils/prop-type-error';
import Toggle from './Toggle';

const mockCallback = jest.fn();

const REQUIRED_PROPS = {
    open : true,
    label : 'switch',
    onClick : mockCallback
};
const para =  "Description of what the Toggle does";


describe('Should use Prop-Types to type check inputs', () =>
{
    it('Test there are no more required props than expected', () =>
    {
        console.error = propTypeError;
        render(<Toggle {...REQUIRED_PROPS} />);
    })

    
    for(const prop in REQUIRED_PROPS)
    {
        it('Test all required props are required', () => 
        {
            let oneReqPropMissing = {...REQUIRED_PROPS};
            delete oneReqPropMissing[prop];
            expect(() => {render(<Toggle {...oneReqPropMissing} />)}).toThrowRequiredPropError(prop);
        })
    };
});

describe('Toggle component shouldn\'t have any clear accessibility issues', () =>
{
    

    it('should not have basic accessibility issues', async () => {

        const { container } = render(<Toggle 
                                      {...REQUIRED_PROPS}
                                      description={para}
                                      />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();    
      });

    it('Toggle shoud link to an Aria-described by paragraph', ()=>
    {
        render(<Toggle 
            {...REQUIRED_PROPS}
            description={para}
            />);
        expect(screen.getByText(para)).toBeInTheDocument();
    });
});

describe('Toggle should render as expected', () =>
{
    it('Should render a text box with label', () =>
    {
        render(<Toggle 
            {...REQUIRED_PROPS}
            description={para}
            />);
        expect(screen.getByRole('button')).toBeInTheDocument();
        
    });

    it('should render a text element on screen', () =>
    {
        render(<Toggle 
            {...REQUIRED_PROPS} 
            description={para}
            />);
        expect(screen.getByText(REQUIRED_PROPS.label)).toBeInTheDocument();
    })
});


describe('On click the toggle should perform the call back', () =>
{
   it('Should call callback', async () =>
   { 
       render(<Toggle 
            onClick={mockCallback} 
            {...REQUIRED_PROPS}
            />);
        await userEvent.click(screen.getByRole('button'));
        await userEvent.click(screen.getByRole('button'));
        await userEvent.click(screen.getByRole('button'));
        expect(mockCallback).toHaveBeenCalledTimes(3);
    })
});

describe('Expect the CSS style to change after an onClick event that changes it\'s state', ()=>
{
    function WrapperForTest()
    {
        const [open, setOpen] = useState(true);
        const props={...REQUIRED_PROPS};
        delete props.open;
        delete props.onClick;

        return(<Toggle {...props} open={open} onClick={() => setOpen(!open)} />);
    }
    
    it('CSS should vary as state is changed through onClick event',async () =>
    {
        render(<WrapperForTest />)
        expect(screen.getByRole('button').closest('div')).toHaveClass('toggle-open');
        userEvent.click(screen.getByRole('button'));
        expect(screen.getByRole('button').closest('div')).toHaveClass('toggle-closed');
    })
})