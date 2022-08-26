import { useRef } from 'react';
import { v4 as uuidV4 } from 'uuid';

export default (id?: string) => {
    const uuid = useRef(
        uuidV4()
    );

    return id ?? uuid.current;
};
