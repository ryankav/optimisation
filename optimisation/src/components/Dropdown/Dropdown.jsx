import React from 'react';
import PropTypes from 'prop-types';

function Dropdown(props)
{
    return(<>
    hello
    </>)
}


Dropdown.propTypes = {items : PropTypes.objectOf(PropTypes.string).isRequired,}

export default Dropdown;

