import React, { useState } from 'react';
import PropTypes from 'prop-types';

function DropdownMenu(props)
{
    const {items, value, name} = props;
    const [open, setOpen] = useState(false);

    return(
    <div className='dropdown-container'>
        <label className='dropdown-label'>
            {name+':'}
        </label>
        <button className='dropdown-button' aria-haspopup="true">
            {value}
            <span 
                aria-hidden='true'
            >
                {"\u25BC"}
            </span>
            
        </button>
    </div>
    );
}


DropdownMenu.propTypes = {items : PropTypes.objectOf(PropTypes.string).isRequired,
                      value: PropTypes.string.isRequired,
                      name: PropTypes.string.isRequired,
                    }

export default DropdownMenu;

