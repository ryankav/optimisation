import React/*,{ useState }*/ from 'react';
//import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import propTypeError from '../../utils/prop-type-error';
import Dropdown from './Dropdown';

const REQUIRED_PROPS = {items:{test:'string'}};

describe('Should use Prop-Types to type check inputs', () =>
{
    it('Test there are no more required props than expected', () =>
    {
        console.error = propTypeError;
        render(<Dropdown {...REQUIRED_PROPS} />);
    })

    
    for(const prop in REQUIRED_PROPS)
    {
        it('Test all required props are required', () => 
        {
            let oneReqPropMissing = {...REQUIRED_PROPS};
            delete oneReqPropMissing[prop];
            expect(() => {render(<Dropdown {...oneReqPropMissing} />)}).toThrowRequiredPropError(prop);
        })
    };
});