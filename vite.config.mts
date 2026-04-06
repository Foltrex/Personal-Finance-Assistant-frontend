import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'

import Fonts from 'unplugin-fonts/vite'
import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '');
  const CONTEXT_PATH = env.VITE_CONTEXT_PATH;
  
  return {
    plugins: [
      Vue({
        template: { transformAssetUrls },
      }),
      Vuetify({
        autoImport: true,
        styles: {
          configFile: 'src/styles/settings.scss',
        },
      }),
      Fonts({
        fontsource: {
          families: [
            {
              name: 'Roboto',
              weights: [100, 300, 400, 500, 700, 900],
              styles: ['normal', 'italic'],
            },
          ],
        },
      })
    ],
    base: `/${CONTEXT_PATH}/`,
    define: { 'process.env': {} },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url)),
      },
      extensions: [
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
      ],
    },
    server: {
      headers: {
        'Content-Type': 'text/css; charset=utf-8'
      }
    },

    preview: {
      headers: {
        'Content-Type': 'text/css; charset=utf-8'
      }
    }
  };
})
