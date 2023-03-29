export const saveToLocalStorage = (key: string, value: string): void => {
    try {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, value);
        }
    } catch { /* don't really care */ }
};

export const retrieveFromLocalStorage = (key: string, isJson = false): string|unknown => {
    try {
        if (typeof window !== 'undefined') {
            const value = window.localStorage.getItem(key);

            if (value) {
                return isJson ? JSON.parse(value) : value;
            }
        }

        return null;
    } catch {
        return null;
    }
};
