import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { existsSync, readdirSync } from 'node:fs';

// Music is optional: if the owner drops an mp3/m4a/aac into public/music/, it is picked up automatically.
const musicFile = existsSync('public/music')
  ? readdirSync('public/music').find((f) => /\.(mp3|m4a|aac)$/i.test(f))
  : undefined;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: { __MUSIC_SRC__: JSON.stringify(musicFile ? `/music/${musicFile}` : '') },
  test: { include: ['tests/unit/**/*.test.ts'], environment: 'node' },
});
