import isPromise from 'is-promise';
import { useCallback, useEffect, useRef } from 'react';

export default () => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    });

    return useCallback((
        callback: () => any | Promise<any>,
        afterRunCallback?: (...args: any[]) => void
    ) => {
        if (isMounted.current) {
            const result = callback();

            if (isPromise(result)) {
                result.then(
                    result => afterRunCallback?.(result)
                );
            } else {
                afterRunCallback?.(result);
            }
        }
    }, []);
};
