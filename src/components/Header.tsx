import logoUrl from '../assets/saintcon-spaceman-logo.png';

type Theme = 'light' | 'dark';

export function Header({ theme, onThemeChange, menuHref, menuLabel }: { theme: Theme; onThemeChange: (theme: Theme) => void; menuHref?: string; menuLabel?: string }) {
    return (
        <header class="site-header">
            <a href="#home" class="brand" title="Back to title">
                <img src={logoUrl} alt="" aria-hidden="true" />
                <span class="brand-name">SAINTCON</span>
                <small>SPACEWAYS · FLIGHT 26</small>
            </a>
            <span class="track">APPSEC DEVELOPER TRACK</span>
            {menuHref && menuLabel && <a class="header-menu-link" href={menuHref}>{menuLabel}</a>}
            <button class="theme-toggle" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}>
                <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
                {theme === 'dark' ? 'LIGHT' : 'DARK'}
            </button>
        </header>
    );
}
