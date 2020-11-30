import React, { useEffect, useState, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import DropdownMenuItems from './DropdownMenuItems';
import useGetObjectSize from '../../utils/custom-hooks/object-size/GetObjectSize';


function DropdownMenu(props)
{

    const {menuItems, value, title} = props;
    const [open, setOpen] = useState(false);
    const focusIndex = useRef(null);
    const [numberOfItems] = useGetObjectSize(menuItems);
    
    const dropdownMenuItems = (<DropdownMenuItems title={title} 
        focusIndex={focusIndex.current}
        menuItems={menuItems}
        />); 
    
    
        
    const buttonClick = () => {setOpen(!open)}

    const buttonKeyPress = (event) => {
        const { key } = event;
        if(!['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(key))
        {
            return;
        }
        
        event.preventDefault();

        if('ArrowUp' === key)
        {
            focusIndex.current = numberOfItems - 1;
        }
        else
        {
            focusIndex.current = 0;
        }

        setOpen(!open);
    }

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
