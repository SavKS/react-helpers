import { Context, useContext } from 'react';

export default <T>(context: Context<T | undefined>, name?: string) => {
    const payload = useContext(context);

    if (!payload) {
        const displayName = name ?? context.displayName;

        throw new Error(`Required${ displayName ? ` "${ displayName }" ` : '' }context not defined`);
    }

    return payload;
};
