import React, { useEffect, useState, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import DropdownMenuItems from './DropdownMenuItems';
import useGetObjectSize from '../../utils/custom-hooks/object-size/GetObjectSize';

/*TODO LIST

- extract keystroke function from event listeners
- come up with name for menu/open close so they become one function
-decouple the check for keys and functionality if key defined but no implementation tests don't work! 

*/


function DropdownMenu(props)
{

    const {menuItems, value, title} = props;
    const [open, setOpen] = useState(false);
    const [focusIndex, setFocusIndex] = useState(null);
    const [numberOfItems] = useGetObjectSize(menuItems);
    const buttonRef = useRef(null);
    
    
    const buttonClick = () => {!open ? expandMenu() : contractMenu()};

    const buttonKeyPress = (event) => {
        const { key } = event;
        if(!['Enter', ' ', 'ArrowDown', 'ArrowUp', 'Escape'].includes(key))
        {
            return;
        }
        
        if('Escape' === key)
        {
            if(open)
            {
                contractMenu();
            }
            return;
        }

        event.preventDefault();

        if('ArrowUp' === key)
        {
            moveFocusUpWithWrap();
        }
        else
        {
            moveFocusDownWithWrap();
        }

        !open ? expandMenu() : contractMenu();
    }

    const itemKeyPress = (event) =>
    {
        const { key } = event;

        if(!['ArrowDown', 'ArrowUp', 'Escape', 'Enter'].includes(key))
        {
            return;
        }

        event.preventDefault();

        if('ArrowDown' === key)
        {
            moveFocusDownWithWrap();
        }
        else if('ArrowUp' === key)
        {
            moveFocusUpWithWrap();
        }
        else if('Escape' === key)
        {
            contractMenu();
        }
        else if('Enter' === key)
        {
            contractMenu();
        }

    }

    const moveFocusDownWithWrap = () =>
    {
        if(null === focusIndex||numberOfItems <= focusIndex + 1)
        {
            setFocusIndex(0);
        }
        else
        {
            setFocusIndex(focusIndex+1);
        }
        
        return;
    }

    const moveFocusUpWithWrap = () =>
    {
        if(null === focusIndex || 0 > focusIndex - 1)
        {
            setFocusIndex(numberOfItems - 1);
        }
        else
        {
            setFocusIndex(focusIndex-1)
        }

        return;
    }

    const expandMenu = () => 
    {
        setOpen(!open);
    }

    const contractMenu = () => 
    {
        setFocusIndex(null);
        setOpen(!open);
        buttonRef.current.focus();
    }


    const dropdownMenuItems = (<DropdownMenuItems title={title} 
        focusIndex={focusIndex}
        menuItems={menuItems}
        itemKeyPress={itemKeyPress}
        />); 

    return(
    <div className='dropdown-container'>
        <label className='dropdown-label'
            id={`${title}-menu-label`}
            >
            {title + ':'}
        </label>
        <div className='dropdown-button-container'>
            <button className='dropdown-button' 
                aria-haspopup="true" 
                aria-expanded={open}
                aria-controls={`${title}-menu`}
                onClick={buttonClick}
                onKeyDown={buttonKeyPress}
                ref={buttonRef}
                >
                {value}
                <span 
                    aria-hidden='true'
                >
                    {open ? "\u25b4" : "\u25be"}
                </span>
            </button>
            {open && dropdownMenuItems}
            
            
        </div>
    </div>
    );
}


DropdownMenu.propTypes = {menuItems : PropTypes.objectOf(PropTypes.string).isRequired,
                      value: PropTypes.string.isRequired,
                      title: PropTypes.string.isRequired,
                    }

export default DropdownMenu;
