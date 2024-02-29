import isEqual from '@savks/not-need-lodash/isEqual';
import { useRef } from 'react';

/**
 * @deprecated Use instead - https://github.com/sandiiarov/use-deep-compare
 */
export default <T>(factory: () => T, deps: any[]): T => {
    const previousDepsRef = useRef<any>();
    const previousValueRef = useRef<any>();

    const equal = isEqual(previousDepsRef.current, deps);

    let value;

    if (equal) {
        value = previousValueRef.current;
    } else {
        value = previousValueRef.current = factory();

        previousDepsRef.current = deps;
    }

    return value;
};
