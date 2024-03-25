import path from 'path';
import { defineConfig } from 'vite';
import createSvgSpritePlugin from 'vite-plugin-svg-spriter';

const SRC_PATH = path.resolve(__dirname, 'src');
const SVG_FOLDER_PATH = path.resolve(SRC_PATH, 'img', 'sprite');

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/mixins.scss"; @import "./src/styles/placeholders.scss";`,
      },
    },
  },
  base: '',
  plugins: [createSvgSpritePlugin({svgFolder: SVG_FOLDER_PATH})],
});
