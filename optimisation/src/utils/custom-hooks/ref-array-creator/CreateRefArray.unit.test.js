import useRefArrayCreator from './CreateRefArray';
import {renderHook} from '@testing-library/react-hooks';
 

describe('Test create refArray hook', () => 
{
    it('returns array of correct size', () =>
    {
        const obj = {1:1, 2:2};
        const {result} = renderHook(() => 
        {
            return useRefArrayCreator(obj);
        })
        
        let refArray = result.current[0].current;
        expect(refArray.length).toEqual(2);
    })

    it('returns array of correct size with string keys', () =>
    {
        const obj = {'key1':'value1',
                    'key2':'value2',
                    'key3':'value3',
                    'key4':'value4',
                    'key5':'value5'};

        const {result} = renderHook(() => 
        {
            return useRefArrayCreator(obj);
        })
        
        let refArray = result.current[0].current;
        expect(refArray.length).toEqual(5);
    })

    it('returns an empty array from empty input', () => 
    {
        const obj = {};
        const {result} = renderHook(() => 
        {
            return useRefArrayCreator(obj);
        })
        
        let refArray = result.current[0].current;
        expect(refArray.length).toEqual(0);

    })
})