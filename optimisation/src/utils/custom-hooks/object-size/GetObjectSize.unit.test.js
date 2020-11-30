import {renderHook} from '@testing-library/react-hooks';
import useGetObjectSize from './GetObjectSize';

describe('Test objectSize hook', ()=>
{
    it('returns correct size', () =>
    {
        const obj = {1:1, 2:2, 3:3};
        const {result} = renderHook(() => 
        {
            return useGetObjectSize(obj);
        })

        let [number] = result.current;
        expect(number).toEqual(3);
    })

    it('Handles different types of keys', () =>
    {
        const obj = {"first":"rugby", "second":"hockey"}
        const {result} = renderHook(() => 
        {
            return useGetObjectSize(obj);
        })

        let [number] = result.current;
        expect(number).toEqual(2);
    })
})
 