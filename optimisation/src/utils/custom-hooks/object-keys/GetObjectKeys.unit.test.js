import {renderHook} from '@testing-library/react-hooks';
import useGetObjectKeys from './GetObjectKeys';

describe('Test objectKey hook', () => {
    it('returns keys', () =>
    {
        const obj={1:1, 2:2}
        const keys = Object.keys(obj);

        const {result} = renderHook(() => 
        {
            return useGetObjectKeys(obj);
        })

        let [returnedKeys] = result.current;
        expect(returnedKeys).toEqual(keys);
    })

    it('works with string keys', () =>
    {
        const obj={"hello":"this", "is":"a test", "for string" : "keys" }
        const keys = Object.keys(obj);

        const {result} = renderHook(() => 
        {
            return useGetObjectKeys(obj);
        })

        let [returnedKeys] = result.current;
        expect(returnedKeys).toEqual(keys);
    })
})