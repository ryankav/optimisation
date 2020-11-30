import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import useGetObjectKeys from '../../utils/custom-hooks/object-keys/GetObjectKeys';
import useRefArrayCreator from '../../utils/custom-hooks/ref-array-creator/CreateRefArray';

function DropdownMenuItems(props)
{
    const {menuItems, focusIndex, title} = props;
    const [menuItemRefs] = useRefArrayCreator(menuItems);
    const [keys] = useGetObjectKeys(menuItems);

    useEffect(() => 
    {
        if(isNaN(focusIndex) || null == focusIndex)
        {
            return;
        }
        menuItemRefs.current[focusIndex].current.focus();
        return;
    }, [focusIndex, menuItemRefs]);

    return (
        <ul id={`${title}-menu`}
                        role='menu'>
                            {keys.map((menuItem, index) =>
                            
                                (<li role='menuitem'
                                    key={menuItem}
                                    ref={menuItemRefs.current[index]}
                                    tabIndex="-1"
                                    >
                                    {menuItem}
                                </li>)
                            )}
                        </ul>
                        )
}

DropdownMenuItems.propTypes = {menuItems : PropTypes.objectOf(PropTypes.string).isRequired,
                                title: PropTypes.string.isRequired,
                                focusIndex : PropTypes.number
                            };

export default DropdownMenuItems;



//     <ul id={`${title}-menu`}
    //                     role='menu'
    //                     aria-labelledby={`${title}-menu-label`}
    //                     aria-activedescendant={`${keys[0]}-${title}-item`}
    //                     className='dropdown-list'
    //                     tabIndex="0"
    //                     >
    //                     {keys.map((item, index) =>{
    //                         return(
    //                             <li key={item}
    //                                 id={`${item}-${title}-item`}
    //                                 role='menuitem'
    //                                 className='dropdown-list-item'
    //                                 ref={itemRefs.current[index]}
    //                                 >
    //                                     {item}
    //                                 </li>
    //                     )})
    //                     }
    //                 </ul>
    //                     );