import { Context, useContext } from 'react';

function useRequiredContext<T>(context: Context<T | undefined>, name?: string): T;

function useRequiredContext<T>(context: Context<T | null>, name?: string): T;

function useRequiredContext<T>(context: Context<T>, name?: string): T;

function useRequiredContext<T>(context: Context<T | undefined>, name?: string) {
    const payload = useContext(context);

    if (payload === undefined) {
        const displayName = name ?? context.displayName;

        throw new Error(`Required${ displayName ? ` "${ displayName }" ` : '' }context not defined`);
    }

    return payload;
}

export default useRequiredContext;
