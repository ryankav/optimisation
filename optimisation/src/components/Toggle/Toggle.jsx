import React from 'react';
import PropTypes from 'prop-types';
import './Toggle.css';

function Toggle(props)
{
    const {label, description, onClick, open, classes} = props;


    return (
    <div className={classes ? `${classes} toggle-container` : 'toggle-container'}>
        <div className="toggle-label-container">
            <label
            id={`${label}-label`} 
            htmlFor={label}
            className="toggle-label"
            >
                {label}
            </label>
        </div>
        

        <div className='toggle'>
            <button
                id={label} 
                aria-describedby={description && `help-${label}`}
                onClick={onClick}
                aria-pressed={open ? 'true' : 'flase'}
                aria-labelledby={`${label}-label`}
                className="toggle-button"
            />
        
            
        </div>
       
        {description && 
        <p 
            className="hide-element toggle-description" 
            id={`help-${label}`}
            >
                {description}
        </p>}
    </div>);
}

Toggle.propTypes = {open : PropTypes.bool.isRequired,
                    label: PropTypes.string.isRequired,
                    onClick: PropTypes.func.isRequired};

export default Toggle