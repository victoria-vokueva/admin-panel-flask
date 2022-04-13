import { useEffect, useState } from 'react';


export const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [inputValid, setInputValid] = useState(false);

    useEffect(() => {
        for (let validation in validations) {
            switch (validation) {
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true);
                    break;
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false); 
                    break;
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || minLengthError) {
            setInputValid(false);
        } else {
            setInputValid(true);
        }
    }, [isEmpty, minLengthError])

    return {
        isEmpty,
        minLengthError,
        inputValid
    }
}