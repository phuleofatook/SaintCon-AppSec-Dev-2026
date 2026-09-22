import { render } from 'preact';
import { App } from './app';
//3rd party styles
import 'diff2html/bundles/css/diff2html.min.css';
import 'highlight.js/styles/github-dark.css';
//Our styles
import './styles.css';
import './ai-review.css';

const root = document.querySelector<HTMLDivElement>('#app');
if (!root) throw new Error('App root element was not found');

render(<App />, root);
