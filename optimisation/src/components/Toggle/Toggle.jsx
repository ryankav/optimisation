import React from 'react';
import PropTypes from 'prop-types';

function Toggle(props)
{
    const {label, description, onClick, open} = props;

    return (
    <>
        <label 
        htmlFor={label}
        className="toggle-label">
            {label}
        </label>

        <input type="checkbox" 
            id={label} 
            aria-describedby={`help-${label}`}
            onClick={onClick}
            className={`toggle-${open ? 'open' : 'closed'}`}
        />

        <p 
            className="hide-element" 
            id={`help-${label}`}
            >
                {description}
        </p>
    </>);
}

Toggle.propTypes = {open : PropTypes.bool.isRequired,
                    label: PropTypes.string.isRequired,
                    onClick: PropTypes.func.isRequired};

export default Toggle