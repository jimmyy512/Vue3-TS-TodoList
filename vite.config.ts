// import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
// import vue from '@vitejs/plugin-vue'

import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import { loadEnv } from 'vite';
import path, { resolve } from 'path';

// import { generateModifyVars } from './build/config/themeConfig';
// import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/utils';
// import { createVitePlugins } from './build/vite/plugin';
// import { OUTPUT_DIR } from './build/constant';

//* 開發模式時: mode = "development"
//* 打包模式時: mode = "production"
export default ({ mode }): UserConfig => {
  // export default (): UserConfig => {
  const root = process.cwd();

  //* env是.env內的參數但都是字串
  const env = loadEnv(mode, root);
  /**
   ** 將env轉成實際的型態,就可以透過viteEnv.xxx去取得env參數,
   ** 並且需要去global.d.ts去修改 interface ViteEnv 的內容。
   */
  const viteEnv = wrapperEnv(env);

  // const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_LEGACY } = viteEnv;

  // const isBuild = command === 'build';

  return {
    // base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3102, // 确保端口与 Dockerfile 中 EXPOSE 的端口相匹配
      host: true,
      strictPort: true, // 确保如果端口已被占用，Vite 不会尝试另一个端口
      watch: {
        usePolling: true, // 通过启用轮询，Vite 不再依赖文件系统事件，而是定期检查文件是否发生了变化。
      },
      proxy: {
        '/api': {
          target: viteEnv.VITE_API_DOMAIN,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/test': {
          target: 'https://api.publicapis.org',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/test/, ''),
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // Used for global import to avoid the need to import each style file separately
            // reference:  Avoid repeated references
            hack: `true; @import (reference) "${resolve('src/design/config.less')}";`,
            // ...generateModifyVars(),
          },
          javascriptEnabled: true,
        },
      },
      postcss: {
        plugins: [
          // 去除打包警告，"@charset" must be the first
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
    plugins: [vue()],
  };
};
