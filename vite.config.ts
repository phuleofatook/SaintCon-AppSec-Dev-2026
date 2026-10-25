import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { execFileSync } from 'node:child_process';

function gitValue(args: string[]) {
  try {
    return execFileSync('git', args, { encoding: 'utf8' }).trim();
  } catch {
    return undefined;
  }
}

const commit = process.env.GITHUB_SHA
  ?? process.env.SOURCE_VERSION
  ?? gitValue(['rev-parse', 'HEAD'])
  ?? 'unknown';
const shortCommit = commit === 'unknown' ? commit : commit.slice(0, 7);
const dirty = !process.env.GITHUB_SHA && !process.env.SOURCE_VERSION && gitValue(['status', '--porcelain']) ? '-dirty' : '';

export default defineConfig({
  // Relative asset paths, so the build works at / and behind the
  // Community Academy portal at /navigators/.
  base: './',
  plugins: [preact()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version ?? '0.0.0'),
    __APP_BUILD__: JSON.stringify(`${shortCommit}${dirty}`),
    __APP_BUILD_FULL__: JSON.stringify(`${commit}${dirty}`),
  },
});
