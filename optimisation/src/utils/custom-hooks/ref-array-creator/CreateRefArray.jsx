import {useRef, useCallback, createRef} from 'react';
import useGetObjectSize from '../object-size/GetObjectSize'; 

function useRefArrayCreator(obj)
{
    const refContainer = useRef([])
    const [objSize] = useGetObjectSize(obj)
    
    const fillRefContainer = useCallback(() => 
    {
        refContainer.current = Array(objSize).fill().map(() => (createRef()));
        return refContainer;
    }, [objSize])

    const itemRefs = fillRefContainer();

    return [itemRefs];
}

export default useRefArrayCreator;
