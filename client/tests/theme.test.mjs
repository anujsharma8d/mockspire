import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const initializer = readFileSync(new URL('../src/context/theme.js', import.meta.url), 'utf8')
  .replace('export function', 'function');
const bootstrap = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  .match(/<script>([\s\S]*?)<\/script>/)[1];

for (const { saved, systemDark, expected, blocked = false } of [
  { saved: 'light', systemDark: true, expected: 'light' },
  { saved: 'dark', systemDark: false, expected: 'dark' },
  { saved: null, systemDark: true, expected: 'dark' },
  { saved: null, systemDark: false, expected: 'light' },
  { saved: 'invalid', systemDark: true, expected: 'dark' },
  { saved: '', systemDark: false, expected: 'light' },
  { blocked: true, systemDark: true, expected: 'dark' },
  { blocked: true, systemDark: false, expected: 'light' },
]) {
  test(`saved=${saved}, systemDark=${systemDark}, blocked=${blocked}`, () => {
    let dark;
    const root = {
      classList: { toggle: (name, active) => { assert.equal(name, 'dark'); dark = active; } },
      style: {},
    };
    const context = vm.createContext({
      localStorage: {
        getItem: (key) => {
          assert.equal(key, 'mockspire-theme');
          if (blocked) throw new Error('Storage disabled');
          return saved;
        },
        setItem: () => assert.fail('Initialization must not overwrite preferences'),
      },
      window: { matchMedia: (query) => {
        assert.equal(query, '(prefers-color-scheme: dark)');
        return { matches: systemDark };
      } },
      document: { documentElement: root },
    });
    vm.runInContext(initializer, context);
    assert.equal(vm.runInContext('getInitialTheme()', context), expected);
    // Repeating initialization must remain safe and agree with the first paint.
    for (let i = 0; i < 2; i++) {
      vm.runInContext(bootstrap, context);
      assert.equal(dark, expected === 'dark');
      assert.equal(root.style.colorScheme, expected);
    }
  });
}
