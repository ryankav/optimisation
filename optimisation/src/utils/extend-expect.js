expect.extend({
    toThrowErrorWithMessage(received, errorMessage)
    {
        let error;

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
                message: () => errorMessage,
            }
        }
        return{
            pass: true,
            message: () => errorMessage,
        }
        
    }
})