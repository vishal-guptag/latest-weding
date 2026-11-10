import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 45_000,
  retries: 0,
  reporter: [['list']],
  webServer: { command: 'npm run preview', url: 'http://127.0.0.1:4173', reuseExistingServer: true, timeout: 60_000 },
  use: { baseURL: 'http://127.0.0.1:4173' },
  projects: [{ name: 'chromium', use: { browserName: 'chromium', channel: 'chrome' } }],
});
