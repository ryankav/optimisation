import React, { useState } from 'react';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import propTypeError from '../../utils/test-utils/prop-type-error';
import Toggle from './Toggle';

const REQUIRED_KEYS = ["open", "title", "onClick"];
Object.freeze(REQUIRED_KEYS);
let REQUIRED_PROPS, mockCallback, para;
beforeEach(()=>
{
    mockCallback = jest.fn();

    REQUIRED_PROPS = {
        open : true,
        title : 'switch',
        onClick : mockCallback
    };
    
    para =  "Description of what the Toggle does";
})

describe('Should use Prop-Types to type check inputs', () =>
{
    it('Test there are no more required props than expected', () =>
    {
        console.error = propTypeError;
        render(<Toggle {...REQUIRED_PROPS} />);
    })

    
    for(const prop of REQUIRED_KEYS)
    {
        it('Test all required props are required', () => 
        {
            delete REQUIRED_PROPS[prop];
            expect(() => {render(<Toggle {...REQUIRED_PROPS} />)}).toThrowRequiredPropError(prop);
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

    it('should render a label element on screen', () =>
    {
        render(<Toggle 
            {...REQUIRED_PROPS} 
            description={para}
            />);
        expect(screen.getByText(REQUIRED_PROPS.title)).toBeInTheDocument();
    })
});


describe('On click the toggle should perform the call back', () =>
{
   it('Should call callback', async () =>
   { 
       render(<Toggle 
            {...REQUIRED_PROPS}
            />);
        await userEvent.click(screen.getByRole('button'));
        await userEvent.click(screen.getByRole('button'));
        await userEvent.click(screen.getByRole('button'));
        expect(REQUIRED_PROPS.onClick).toHaveBeenCalledTimes(3);
    })

    it('Should update correctly',async () =>
    {
        function WrapperForTest()
        {
            const [open, setOpen] = useState(true);
            REQUIRED_PROPS.title = `Toggle is ${open ? 'open' : 'closed'}`;
            REQUIRED_PROPS.open=open;
            REQUIRED_PROPS.onClick = () => setOpen(!open);
    
            return(<Toggle {...REQUIRED_PROPS} />);
        }
        render(<WrapperForTest />)
        expect(screen.getByText('Toggle is open')).toBeInTheDocument();
        expect(screen.getByRole('button', {'aria-pressed':true})).toBeInTheDocument();
        userEvent.click(screen.getByRole('button'));
        expect(screen.getByText('Toggle is closed')).toBeInTheDocument();
        expect(screen.getByRole('button', {'aria-pressed':false})).toBeInTheDocument();
    })
});

