import React from 'react';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';

import Toggle from './Toggle';

describe('Toggle component shouldn\'t have any clear accessibility issues', () =>
{
    const label = 'switch';
    const para =  "Description of what the Toggle does";

    it('should not have basic accessibility issues', async () => {

        const { container } = render(<Toggle 
                                      label={label} 
                                      description={para}
                                      />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();    
      });

    it('Toggle shoud link to an Aria-described by paragraph', ()=>
    {
        render(<Toggle 
            label={label} 
            description={para}
            />);
        expect(screen.getByText(para)).toBeInTheDocument();
    });
});

describe('Toggle should render as expected', () =>
{
    const label = '2DFunctionToggle';
    const para = "filler";

    it('Should render a text box with label', () =>
    {
        render(<Toggle 
            label={label} 
            description={para}
            />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        
    });

    it('should render a text element on screen', () =>
    {
        render(<Toggle 
            label={label} 
            description={para}
            />);
        expect(screen.getByText(label)).toBeInTheDocument();
    })
});


