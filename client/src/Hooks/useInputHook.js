import {useState} from 'react';

export const useInput = (initialState) => {
    let [state, setState] = useState(initialState);

    let setValue = (arg) => {
            setState(arg);
    }
    return [state, setValue]
};