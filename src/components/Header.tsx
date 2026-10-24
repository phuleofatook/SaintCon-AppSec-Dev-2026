import logoUrl from '../assets/saintcon-spaceman-logo.png';

type Theme = 'light' | 'dark';

export function Header({ theme, onThemeChange, menuHref, menuLabel }: { theme: Theme; onThemeChange: (theme: Theme) => void; menuHref?: string; menuLabel?: string }) {
    return (
        <header class="site-header">
            <a href="/" class="brand" title="Return to AppSec Community Academy">
                <img src={logoUrl} alt="" aria-hidden="true" />
                <span class="brand-name">APPSEC</span>
            </a>
            <a href="#home" class="track track-link">DEVELOPER TRACK</a>
            {menuHref && menuLabel && <a class="header-menu-link" href={menuHref}>{menuLabel}</a>}
            <button class="theme-toggle" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}>
                <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
                {theme === 'dark' ? 'LIGHT' : 'DARK'}
            </button>
        </header>
    );
}
