import type { SiteColor, SiteFont, SiteMode, SiteTheme } from "@models/SiteTheme";
import { retrieveFromLocalStorage, saveToLocalStorage } from "./localStorageUtils";

export const toggleSiteMode = () => {
    const currentTheme = getCurrentTheme();

    if (currentTheme.mode === 'light') {
        saveToLocalStorage('mode', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        saveToLocalStorage('mode', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
    }
};

export const changeColor = (color: SiteColor) => {
    saveToLocalStorage('color', color);
    document.documentElement.setAttribute('data-color-theme', color);
}

export const changeFont = (font: SiteFont) => {
    saveToLocalStorage('font', font);
    document.documentElement.setAttribute('data-font-theme', font);
}

export const getCurrentTheme = (): SiteTheme => {
    return {
        mode: retrieveFromLocalStorage('mode') as SiteMode | null ?? 'system',
        color: retrieveFromLocalStorage('color') as SiteColor | null ?? 'green',
        font: retrieveFromLocalStorage('font') as SiteFont | null ?? 'sans',
    };
}

export const getPreferredColorMode = (): SiteMode => {
    if (typeof window !== 'undefined') {
        const prefferredMode = window.matchMedia('(prefers-color-scheme: dark)');

        if (prefferredMode.matches) {
            return 'dark';
        }
    }

    return 'light';
};