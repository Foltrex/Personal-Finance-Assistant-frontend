import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults, ConfigEnv } from 'vitest/config'
import viteConfig from './vite.config.mjs';


export default defineConfig((configEnv) => {
  // Get the vite config with the current environment
  const resolvedViteConfig = typeof viteConfig === 'function' 
    ? viteConfig(configEnv) 
    : viteConfig;

  return mergeConfig(
    resolvedViteConfig,
    defineConfig({
      test: {
        environment: 'jsdom',
        exclude: [...configDefaults.exclude, 'e2e/**'],
        root: fileURLToPath(new URL('./', import.meta.url)),
      },
    })
  );
});