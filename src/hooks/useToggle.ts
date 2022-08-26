import { useCallback, useMemo, useState } from 'react';

export default (defaultValue = false) => {
    const [ value, setValue ] = useState<boolean>(defaultValue);

    const setTrue = useCallback(() => {
        setValue(true);
    }, []);

    const setFalse = useCallback(() => {
        setValue(false);
    }, []);

    const setOpposite = useCallback(() => {
        setValue(value => !value);
    }, []);

    const set = useCallback((value: boolean) => {
        setValue(value);
    }, []);

    return useMemo(
        () => ({
            value,
            setTrue,
            setFalse,
            setOpposite,
            set
        }),
        [ value, setTrue, setFalse, setOpposite, set ]
    );
};
