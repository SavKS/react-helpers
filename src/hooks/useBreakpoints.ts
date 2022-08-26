import { useEffect, useState } from 'react';
import useMemoCompare from './useMemoCompare';

type BreakpointParams = number | string | (string | number)[];

type Config = Record<string, BreakpointParams>;

function addUnits(value: number | undefined | string) {
    if (Number.isNaN(value)) {
        return value;
    }

    return `${ value }px`;
}

function getMediaQuery(param: BreakpointParams) {
    let mediaQuery = 'screen and ';

    if (Array.isArray(param)) {
        mediaQuery += `(min-width: ${ addUnits(param[ 0 ]) })`;

        if (param.length === 2) {
            mediaQuery += ` and (max-width: ${ addUnits(param[ 1 ]) })`;
        }

        return mediaQuery;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!Number.isNaN(parseInt(param))) {
        mediaQuery += `(max-width: ${ addUnits(param) })`;
        return mediaQuery;
    }

    return String(param).replace(/^@?media/i, '').trim();
}

export default function (config: Config) {
    const mediaQueries = useMemoCompare(
        () => Object.entries(config).reduce(
            (carry, [ key, param ]) => {
                carry[ key ] = window.matchMedia(
                    getMediaQuery(param)
                );

                return carry;
            },
            {} as Record<string, MediaQueryList>
        ),
        [ config ]
    );

    const [ breakpoints, setBreakpoints ] = useState(
        () => Object.entries(mediaQueries).reduce(
            (carry, [ key, mediaQuery ]) => {
                carry[ key ] = mediaQuery.matches;

                return carry;
            },
            {} as Record<string, boolean>
        )
    );

    useEffect(() => {
        const removeListeners: (() => void)[] = [];

        Object.entries(mediaQueries).forEach(([ key, mediaQuery ]) => {
            const setValue = (event: MediaQueryListEvent) => {
                setBreakpoints({
                    ...breakpoints,

                    [ key ]: event.matches
                });
            };

            mediaQuery.addListener(setValue);

            removeListeners.push(() => {
                mediaQuery.removeListener(setValue);
            });
        });

        return () => removeListeners.forEach(
            removeListener => removeListener()
        );
    }, [ breakpoints, mediaQueries ]);

    return breakpoints as Record<string, boolean>;
}
