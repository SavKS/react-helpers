import { useEffect, useRef } from 'react';

export default (label?: string) => {
    const labelRef = useRef<string | undefined>(label);

    useEffect(() => {
        const label = labelRef.current;

        if (label) {
            // eslint-disable-next-line no-console
            console.log(`Mount: ${ label }`);
        } else {
            // eslint-disable-next-line no-console
            console.log('Mount');
        }

        return () => {
            if (label) {
                // eslint-disable-next-line no-console
                console.log(`Unmount: ${ label }`);
            } else {
                // eslint-disable-next-line no-console
                console.log('Unmount');
            }
        };
    }, []);
};
