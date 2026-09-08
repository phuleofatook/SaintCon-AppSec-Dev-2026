import { render } from 'preact';
import 'diff2html/bundles/css/diff2html.min.css';
import './styles.css';
import './ai-review.css';
import { App } from './app';

const root = document.querySelector<HTMLDivElement>('#app');
if (!root) throw new Error('App root element was not found');

render(<App />, root);
