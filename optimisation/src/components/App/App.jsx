import React, {useState} from 'react';
import DropdownMenu from '../Dropdown/DropdownMenu';

const App = () =>
    {
        
        const items = {test: 'hello',};
        return(
            <>
                <DropdownMenu items={items} value={'World'} name={'Name'} />
            </>
        );
       
    }

export default App;