const util = require('util');

const propTypeError = (...args) =>
        {   
            let str = util.format(...args);
            if(/(Failed prop type|Invalid prop)/i.test(str))
            {
                throw new Error(str);
            }
        };

export default propTypeError;