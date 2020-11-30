import React from 'react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

const App = () =>
    {
        
        const items = {test: 'hello', nfl: 'life', again:'help'};
        return(
            <>
                <DropdownMenu menuItems={items} value={'World'} title={'Algorithm'} />
            </>
        );
       
    }

export default App;