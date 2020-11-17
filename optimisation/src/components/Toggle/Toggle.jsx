import React from 'react';
import PropTypes from 'prop-types';

function Toggle(props)
{
    const {label, description, onClick, open, classes} = props;


    return (
    <>
        <div className="toggle-label">
            <label
            id={`${label}-label`} 
            htmlFor={label}
            className={classes ? classes : false}
            >
                {label}
            </label>
        </div>
        

        <div className={open ? 'toggle-open' : 'toggle-closed'}>
            <input
                type="button"
                id={label} 
                aria-describedby={description && `help-${label}`}
                onClick={onClick}
                className={classes ? classes : false}
                aria-pressed={open ? 'true' : 'flase'}
                aria-labelledby={`${label}-label`}
            />

        </div>
       
        {description && 
        <p 
            className="hide-element" 
            id={`help-${label}`}
            >
                {description}
        </p>}
    </>);
}

Toggle.propTypes = {open : PropTypes.bool.isRequired,
                    label: PropTypes.string.isRequired,
                    onClick: PropTypes.func.isRequired};

export default Toggle