import React from 'react';
import PropTypes from 'prop-types';
import './Toggle.css';

function Toggle(props)
{
    const {title, description, onClick, open, classes} = props;


    return (
    <div className={classes ? `${classes} toggle-container` : 'toggle-container'}>
        <div className="toggle-label-container">
            <label
            id={`${title}-label`} 
            htmlFor={title}
            className="toggle-label"
            >
                {title}
            </label>
        </div>
        

        <div className='toggle'>
            <button
                id={title} 
                aria-describedby={description && `help-${title}`}
                onClick={onClick}
                aria-pressed={open ? 'true' : 'flase'}
                aria-labelledby={`${title}-label`}
                className="toggle-button"
            />
        
            
        </div>
       
        {description && 
        <p 
            className="hide-element toggle-description" 
            id={`help-${title}`}
            >
                {description}
        </p>}
    </div>);
}

Toggle.propTypes = {open : PropTypes.bool.isRequired,
                    title: PropTypes.string.isRequired,
                    onClick: PropTypes.func.isRequired};

export default Toggle