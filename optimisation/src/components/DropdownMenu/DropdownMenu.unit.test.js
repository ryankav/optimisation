import React/*,{ useState }*/ from 'react';
//import { axe } from 'jest-axe';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import propTypeError from '../../utils/test-utils/prop-type-error';
import DropdownMenu from './DropdownMenu';


const REQUIRED_KEYS = ["menuItems", "value", "title",]
Object.freeze(REQUIRED_KEYS);
let REQUIRED_PROPS;

beforeEach(()=>
{
    REQUIRED_PROPS = {
        menuItems:{
            "first":"Hello",
            "second":",",
            "third" : "World"
            },
        value:'test',
        title: "Algorithm",
        };
})

describe('Should use Prop-Types to type check inputs', () =>
{
    it('Test there are no more required props than expected', () =>
    {
        console.error = propTypeError;
        render(<DropdownMenu {...REQUIRED_PROPS} />);
    })

    for(let key of REQUIRED_KEYS)
    {
        it('Required props are required', () => 
        {
            delete REQUIRED_PROPS[key];
            expect(() => {render(<DropdownMenu {...REQUIRED_PROPS} />)}).toThrowRequiredPropError(key);
        })
    }
})

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

    it('Resets focus state after closing', ()=>
    {
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        userEvent.tab();
        fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowDown', code: 'ArrowDown' });
        userEvent.click(screen.getByRole('button'));
        userEvent.click(screen.getByRole('button'));
        const listItems = (screen.getAllByRole('menuitem'))
        expect(listItems.includes(document.activeElement)).toBeFalsy();
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

    it('should focus on first item after down press', () =>
    {
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        userEvent.tab();
        expect(screen.getByRole('button')).toHaveFocus();
        fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowDown', code: 'ArrowDown' });
        const listItems = (screen.getAllByRole('menuitem'));
        expect(listItems[0]).toHaveFocus();
    })

    it('should focus on last item after up press', () =>
    {
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        userEvent.tab();
        expect(screen.getByRole('button')).toHaveFocus();
        fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowUp', code: 'ArrowUp' });
        const listItems = (screen.getAllByRole('menuitem'));
        expect(listItems[listItems.length - 1]).toHaveFocus();
    })

    it('tab to button and focus second item after two down presses', () =>
    {
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        userEvent.tab();
        fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowDown', code: 'ArrowDown' });
        fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowDown', code: 'ArrowDown' });
        const listItems = (screen.getAllByRole('menuitem'));
        expect(listItems[1]).toHaveFocus();
    })

    it('should move to penultimate item after two up presses', () =>
    {
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        userEvent.tab();
        fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowUp', code: 'ArrowUp' });
        fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowUp', code: 'ArrowUp' });
        const listItems = (screen.getAllByRole('menuitem'));
        if(3 > listItems.length)
        {
            console.log('Not enough list items for test to be valid. So forcing test to fail')
            expect(1).toEqual(0);
        }
        expect(listItems[listItems.length - 2]).toHaveFocus()
    })

    it('should wrap correctly from bottom to top', () =>
    {
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        userEvent.tab();
        fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowUp', code: 'ArrowUp' });
        fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowDown', code: 'ArrowDown' });
        const listItems = (screen.getAllByRole('menuitem'));
        expect(listItems[0]).toHaveFocus();
    })

    it('should wrap correctly from top to bottom', () =>
    {
        render(<DropdownMenu {...REQUIRED_PROPS} />);
        userEvent.tab();
        fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowDown', code: 'ArrowDown' });
        fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowUp', code: 'ArrowUp' });
        const listItems = (screen.getAllByRole('menuitem'));
        expect(listItems[listItems.length - 1]).toHaveFocus();
    })
})