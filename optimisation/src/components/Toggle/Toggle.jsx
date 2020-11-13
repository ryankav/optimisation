import React from 'react';

function Toggle(props)
{
    const {label, description} = props;

    return (
    <>
        <label for={label}>
            {label}
        </label>

        <input type="checkbox" 
            id={label} 
            aria-describedby={`help-${label}`}
        />

        <p 
            className="hide-element" 
            id={`help-${label}`}
            >
                {description}
        </p>
    </>);
}

export default Toggle