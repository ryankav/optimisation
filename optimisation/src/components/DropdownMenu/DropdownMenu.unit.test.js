import React/*,{ useState }*/ from 'react';
//import { axe } from 'jest-axe';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import propTypeError from '../../utils/prop-type-error';
import DropdownMenu from './DropdownMenu';


let REQUIRED_PROPS;

beforeEach(()=>
{
    REQUIRED_PROPS = {
        menuItems:{
            "first":"rugby",
            "second":"help"
            },
        value:'test',
        title: "Algorithm" 
        };
})

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
            delete REQUIRED_PROPS[prop]
            expect(() => {render(<DropdownMenu {...REQUIRED_PROPS} />)}).toThrowRequiredPropError(prop);
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
        expect(screen.getByText("\u25BE")).toBeInTheDocument();
    })

    it('Should render the name of the object passed to it in props', () =>
    {
        const regex = new RegExp(REQUIRED_PROPS.title, 'i');
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


describe('User click input', () => 
{
    it('Menu opens on click', async () =>
    {
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        userEvent.click(screen.getByRole('button'));
        const listItems = (screen.getAllByRole('menuitem')).map(item => item.textContent);
        expect(Object.keys(REQUIRED_PROPS.menuItems)).toEqual(listItems);
    });

    it('Arrow points up after click', () =>
    {
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        userEvent.click(screen.getByRole('button'));
        expect(screen.getByText("\u25B4")).toBeInTheDocument();
    })

})


describe('User Key Input', () => 
{
    it('tab to button and open on down button', () =>
    {
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        userEvent.tab();
        expect(screen.getByRole('button')).toHaveFocus();
        fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowDown', code: 'ArrowDown' });
        const listItems = (screen.getAllByRole('menuitem')).map(item => item.textContent);
        expect(Object.keys(REQUIRED_PROPS.menuItems)).toEqual(listItems);
    })

    
    it('tab to button and open on up press',  () =>
    {
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        userEvent.tab();
        expect(screen.getByRole('button')).toHaveFocus();
        fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowDown', code: 'ArrowDown' });
        const listItems = (screen.getAllByRole('menuitem')).map(item => item.textContent);
        expect(Object.keys(REQUIRED_PROPS.menuItems)).toEqual(listItems);
    })
    
    
    it('tab to button and open on up press',  () =>
    {
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        userEvent.tab();
        expect(screen.getByRole('button')).toHaveFocus();
        fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowUp', code: 'ArrowUp' });
        const listItems = (screen.getAllByRole('menuitem')).map(item => item.textContent);
        expect(Object.keys(REQUIRED_PROPS.menuItems)).toEqual(listItems);
    })

    
    it('tab to button and open on enter press', () =>
    {
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        userEvent.tab();
        expect(screen.getByRole('button')).toHaveFocus();
        fireEvent.keyDown(document.activeElement || document.body, { key: 'Enter', code: 'Enter'});
        const listItems = (screen.getAllByRole('menuitem')).map(item => item.textContent);
        expect(Object.keys(REQUIRED_PROPS.menuItems)).toEqual(listItems);
    })

    
    it('tab to button and open on enter press', () => {
            render(<DropdownMenu {...REQUIRED_PROPS} />);
            userEvent.tab();
            expect(screen.getByRole('button')).toHaveFocus();
            fireEvent.keyDown(document.activeElement || document.body, { key: ' ', code: 'Space' });
            const listItems = (screen.getAllByRole('menuitem')).map(item => item.textContent);
            expect(Object.keys(REQUIRED_PROPS.menuItems)).toEqual(listItems);
        })

    it('tab to button and shouldn\'t open on tab press', () =>
    {
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        userEvent.tab();
        expect(screen.getByRole('button')).toHaveFocus();
        fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab', code: 'Tab'});
        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
        
    })

    // it('should focus on first item after down press', () =>
    // {
    //     render(<DropdownMenu {...REQUIRED_PROPS} />);
    //     userEvent.tab();
    //     expect(screen.getByRole('button')).toHaveFocus();
    //     fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowDown', code: 'ArrowDown' });
    //     const listItems = (screen.getAllByRole('menuitem')).map(item => item.textContent);
    //     expect(listItems[0]).toHaveFocus();
    // })
})