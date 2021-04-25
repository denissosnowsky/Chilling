import {useState} from 'react';

export const useToggle = (initialState, func='') => {
    let [state, setState] = useState(initialState);

    let setValue = (e) => {
        if(state){
            {func && func(e.currentTarget.value)};
        }
        setState(!state);
    }

    return [state, setValue]
};