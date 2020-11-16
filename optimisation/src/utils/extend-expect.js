import propTypeError from './prop-type-error';

expect.extend({
    toThrowRequiredPropError(received, propName)
    {   
        
        let error;
        console.error = propTypeError;
        try
        {
            received()
        }
        catch (e)
        {
            error = e;
        }

        if(!error)
        {
            return{
                pass: false,
                message: () =>  `Without the ${propName} prop defined an error should've been thrown.\nYet no Error was thrown by the component.`,
            }
        }
        return{
            pass: true,
            message: () => `With the ${propName} prop undefined no error should've been thrown.\nYet an Error was thrown by the component.`,
        }
        
    }
})