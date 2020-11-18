import React, {useState} from 'react';
import Toggle from '../Toggle/Toggle';

const App = () =>
    {
        const [open, setOpen] = useState(true);
        const label = 'Switch'

        return(
            <>
                <Toggle
                    open={open} 
                    onClick={() => setOpen(!open)}
                    label={label} 
                />
            </>
        );
       
    }

export default App;