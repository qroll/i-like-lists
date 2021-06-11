import { useEffect } from 'react';

// https://stackoverflow.com/a/61127960
export const useDebouncedEffect = (effect: () => void, dependencies: any[], timeout: number): void => {
    useEffect(() => {
        const handler = setTimeout(() => effect(), timeout);

        return () => clearTimeout(handler);
    }, [timeout, ...dependencies]);
}