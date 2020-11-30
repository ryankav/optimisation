import {useCallback} from 'react';

function useGetObjectKeys(obj)
{
    const getObjectKeys = useCallback(() => {return Object.keys(obj)}, [obj]);
    const objectKeys = getObjectKeys();
    return[objectKeys];
}

export default useGetObjectKeys;