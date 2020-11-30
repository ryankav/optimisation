import {useCallback} from 'react';

function useGetObjectSize(obj)
{
    const getObjectSize = useCallback(() => {return Object.keys(obj).length}, [obj]);
    const objectSize = getObjectSize();
    return [objectSize];
}

export default useGetObjectSize;