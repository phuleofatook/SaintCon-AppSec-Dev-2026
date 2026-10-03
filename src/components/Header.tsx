type Theme = 'light' | 'dark';

export function Header({ theme, onThemeChange }: { theme: Theme; onThemeChange: (theme: Theme) => void }) {

    return (
        <header class="site-header">
            <a href="#home" class="brand">
                <span>✦</span> SAINTCON <small>SPACEWAYS · FLIGHT 26</small>
            </a>
            <span class="track">APPSEC DEVELOPER TRACK</span>
            <button class="theme-toggle" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}>
                <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
                {theme === 'dark' ? 'LIGHT' : 'DARK'}
            </button>
        </header>
    );
}
