export type SiteMode = 'light' | 'dark' | 'system';
export type SiteColor = 'red' | 'orange' | 'green' | 'blue' | 'purple';
export type SiteFont = 'sans' | 'serif' | 'mono';

export interface SiteTheme {
    mode: SiteMode;
    color: SiteColor;
    font: SiteFont;
}