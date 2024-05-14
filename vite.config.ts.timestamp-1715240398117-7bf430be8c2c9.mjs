// vite.config.ts
import { resolve as resolve2 } from "node:path";
import process2 from "node:process";
import { defineConfig, loadEnv } from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/vite@5.1.3_@types+node@20.11.19_sass@1.71.1/node_modules/vite/dist/node/index.js";
import dayjs2 from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/dayjs.min.js";

// build/getEnv.ts
function wrapperEnv(envConf) {
  const viteEnv = {};
  for (const envKey of Object.keys(envConf)) {
    let envValue = envConf[envKey].replace(/\\n/g, "\n");
    envValue = envValue === "true" ? true : envValue === "false" ? false : envValue;
    if (envKey === "VITE_PORT")
      envValue = Number(envValue);
    if (envKey === "VITE_PROXY")
      envValue = JSON.parse(envValue);
    viteEnv[envKey] = envValue;
  }
  return viteEnv;
}

// build/proxy.ts
function setupProxy(proxyList = []) {
  const ret = {};
  for (const [prefix, target] of proxyList) {
    const isHttps = /^https:\/\//.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path2) => path2.replace(prefix, ""),
      secure: !isHttps
    };
  }
  return ret;
}

// build/index.ts
import { visualizer } from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@2.79.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { createHtmlPlugin } from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.1.3/node_modules/vite-plugin-html/dist/index.mjs";
import vue from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.3_vue@3.4.19/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.1.3_vue@3.4.19/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueSetupExtend from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/unplugin-vue-setup-extend-plus@1.0.1/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
import UnoCSS from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/unocss@0.58.5_postcss@8.4.35_rollup@2.79.1_vite@5.1.3/node_modules/unocss/dist/vite.mjs";
import Icons from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/unplugin-icons@0.18.5_@vue+compiler-sfc@3.4.19/node_modules/unplugin-icons/dist/vite.js";
import Inspect from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/vite-plugin-inspect@0.8.3_rollup@2.79.1_vite@5.1.3/node_modules/vite-plugin-inspect/dist/index.mjs";
import VueDevTools from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/vite-plugin-vue-devtools@1.0.0-rc.7_pug@3.0.2_rollup@2.79.1_vite@5.1.3/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";

// build/plugins/compress.ts
import viteCompression from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.1.3/node_modules/vite-plugin-compression/dist/index.mjs";
function setupCompression(viteEnv) {
  const { VITE_COMPRESS_ALGORITHM = "none", VITE_DELETE_COMPRESS_ORIGIN_FILE } = viteEnv;
  const algorithmList = VITE_COMPRESS_ALGORITHM.split(",");
  const plugins = [];
  const compressModeMap = {
    gzip: viteCompression({
      ext: ".gz",
      algorithm: "gzip",
      deleteOriginFile: VITE_DELETE_COMPRESS_ORIGIN_FILE
    }),
    brotli: viteCompression({
      ext: ".br",
      algorithm: "brotliCompress",
      deleteOriginFile: VITE_DELETE_COMPRESS_ORIGIN_FILE
    })
  };
  if (algorithmList.includes("gzip"))
    plugins.push(compressModeMap.gzip);
  if (algorithmList.includes("brotli"))
    plugins.push(compressModeMap.brotli);
  return plugins;
}

// build/plugins/pwa.ts
import { VitePWA } from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/vite-plugin-pwa@0.19.0_vite@5.1.3_workbox-build@7.0.0_workbox-window@7.0.0/node_modules/vite-plugin-pwa/dist/index.js";
function setupVitePWA(viteEnv) {
  const { VITE_APP_TITLE: NAME } = viteEnv;
  return VitePWA({
    outDir: "dist",
    manifest: {
      name: NAME,
      short_name: NAME,
      theme_color: "#ffffff",
      icons: [
        {
          src: "/logos/logo_512.png",
          type: "img/png",
          sizes: "512x512",
          purpose: "any"
        },
        {
          src: "/logos/logo_192.png",
          type: "img/png",
          sizes: "192x192",
          purpose: "maskable"
        }
      ]
    }
  });
}

// build/plugins/auto-component.ts
import Components from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/unplugin-vue-components@0.26.0_rollup@2.79.1_vue@3.4.19/node_modules/unplugin-vue-components/dist/vite.js";

// build/plugins/auto-element-plus.ts
import { ElementPlusResolver } from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/unplugin-vue-components@0.26.0_rollup@2.79.1_vue@3.4.19/node_modules/unplugin-vue-components/dist/resolvers.js";
import IconsResolver from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/unplugin-icons@0.18.5_@vue+compiler-sfc@3.4.19/node_modules/unplugin-icons/dist/resolver.js";
function setupAtuoEpApi() {
  return [
    // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
    ElementPlusResolver({ importStyle: "sass" }),
    /*
        // 自动导入图标组件，使用方式：
         1: <i-ep-share />
         2: <IEpShare />
         3: <el-icon color="#409EFC"><IEpShare /></el-icon>
     */
    IconsResolver()
  ];
}
function setupAtuoEpComponent() {
  return [
    // 自动导入 Element Plus 组件
    ElementPlusResolver(),
    // 自动注册图标组件
    IconsResolver({
      // enabledCollections: ['ep'],
    })
  ];
}

// build/plugins/auto-component.ts
function setupAtuoComponent(viteEnv) {
  const { VITE_AUTO_EP } = viteEnv;
  return Components({
    resolvers: [
      ...VITE_AUTO_EP ? setupAtuoEpComponent() : []
    ],
    deep: true,
    // 搜索子目录
    dirs: ["src/components/common"],
    // 指定扫描的文件夹
    dts: "src/types/components.d.ts"
  });
}

// build/plugins/auto-import-api.ts
import AutoImport from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.8.0_rollup@2.79.1/node_modules/unplugin-auto-import/dist/vite.js";
function setupAtuoImport(viteEnv) {
  const { VITE_AUTO_EP } = viteEnv;
  return AutoImport({
    // 指定要进行自动导入的文件类型
    include: [
      /\.[tj]sx?$/,
      // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/,
      // .vue
      /\.md$/
      // .md
    ],
    // 指定需自动导入的库
    imports: [
      // 预定义
      "vue",
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      "pinia",
      "vue-router",
      "@vueuse/core"
    ],
    resolvers: [
      ...VITE_AUTO_EP ? setupAtuoEpApi() : []
    ],
    // dirs: ['src/hooks'],
    // 指定生成路径 注：需是相对路径
    dts: "src/types/auto-imports.d.ts"
  });
}

// build/plugins/web-update-notify.ts
import { webUpdateNotice } from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/@plugin-web-update-notification+vite@1.7.1_vite@5.1.3/node_modules/@plugin-web-update-notification/vite/dist/index.js";
function setupWebUpdateNotification() {
  return webUpdateNotice({
    notificationProps: {
      title: "\u{1F44B} \u6709\u65B0\u7248\u672C\u4E86",
      description: "\u70B9\u51FB\u5237\u65B0\u9875\u9762\u83B7\u53D6\u6700\u65B0\u7248\u672C",
      buttonText: "\u5237\u65B0",
      dismissButtonText: "\u5FFD\u7565"
    }
  });
}

// build/plugins/print-build-info.ts
import dayjs from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/dayjs.min.js";
import duration from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/plugin/duration.js";
import pc from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/picocolors@1.0.0/node_modules/picocolors/picocolors.js";

// package.json
var package_default = {
  name: "x-wan-demo",
  type: "module",
  version: "0.0.1",
  private: true,
  description: "open source management system",
  author: {
    name: "fxzer",
    email: "3010099292@qq.com",
    url: "https://github.com/fxzer"
  },
  license: "MIT",
  homepage: "https://github.com/fxzer/x-wan-demo.git",
  repository: {
    type: "git",
    url: "git@github.com:fxzer/x-wan-demo.git"
  },
  bugs: {
    url: "https://github.com/fxzer/x-wan-demo.git/issues"
  },
  engines: {
    node: ">=18.0.0"
  },
  scripts: {
    dev: "vite",
    "dev-pwa": "PWA_DEV=true vite",
    build: "vite build",
    "build:dev": "vue-tsc && vite build --mode development",
    "build:test": "vue-tsc && vite build --mode test",
    report: "vue-tsc && vite build --report",
    "build:pro": "vue-tsc && vite build --mode production",
    "type:check": "vue-tsc --noEmit --skipLibCheck",
    preview: "npm run build:dev && vite preview",
    preinstall: "npx only-allow pnpm",
    release: "standard-version",
    lint: "eslint .",
    lintf: "eslint . --fix",
    commitlint: "commitlint --config commitlint.config.cjs -e -V",
    commit: "git add -A && czg && git push",
    "clean:cache": "rimraf node_modules && rimraf .eslintcache && rm -rf dist && pnpm install"
  },
  dependencies: {
    "@element-plus/icons-vue": "^2.3.1",
    "@vueuse/core": "^10.8.0",
    "animate.css": "^4.1.1",
    axios: "^1.6.7",
    dayjs: "^1.11.10",
    echarts: "^5.5.0",
    "echarts-liquidfill": "^3.1.0",
    "element-plus": "^2.5.6",
    "fast-glob": "^3.3.2",
    md5: "^2.3.0",
    nprogress: "^0.2.0",
    pinia: "^2.1.7",
    "pinia-plugin-persistedstate": "^3.2.1",
    "print-js": "^1.6.0",
    qs: "^6.11.2",
    sortablejs: "^1.15.2",
    "v-wave": "^2.0.0",
    vue: "^3.4.19",
    "vue-i18n": "^9.9.1",
    "vue-router": "^4.2.5",
    vuedraggable: "^4.1.0"
  },
  devDependencies: {
    "@antfu/eslint-config": "^2.6.4",
    "@antfu/ni": "^0.21.12",
    "@commitlint/cli": "^18.6.1",
    "@commitlint/config-conventional": "^18.6.2",
    "@iconify/json": "^2.2.184",
    "@plugin-web-update-notification/vite": "^1.7.1",
    "@types/md5": "^2.3.5",
    "@types/node": "^20.11.19",
    "@types/nprogress": "^0.2.3",
    "@types/qs": "^6.9.11",
    "@types/sortablejs": "^1.15.8",
    "@typescript-eslint/parser": "^7.0.2",
    "@unocss/eslint-config": "^0.58.5",
    "@unocss/preset-rem-to-px": "^0.58.5",
    "@unocss/reset": "^0.58.5",
    "@vitejs/plugin-vue": "^5.0.4",
    "@vitejs/plugin-vue-jsx": "^3.1.0",
    autoprefixer: "^10.4.17",
    "cz-git": "^1.8.0",
    czg: "^1.8.0",
    eslint: "^8.56.0",
    "eslint-plugin-format": "^0.1.0",
    execa: "^8.0.1",
    husky: "^9.0.11",
    "lint-staged": "^15.2.2",
    mockjs: "^1.1.0",
    postcss: "^8.4.35",
    "postcss-html": "^1.6.0",
    rimraf: "^5.0.5",
    "rollup-plugin-visualizer": "^5.12.0",
    sass: "^1.71.1",
    "standard-version": "^9.5.0",
    typescript: "^5.3.3",
    unocss: "^0.58.5",
    "unplugin-auto-import": "^0.17.5",
    "unplugin-icons": "^0.18.5",
    "unplugin-vue-components": "^0.26.0",
    "unplugin-vue-setup-extend-plus": "^1.0.1",
    vite: "^5.1.3",
    "vite-plugin-checker": "^0.6.4",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-html": "^3.2.2",
    "vite-plugin-inspect": "^0.8.3",
    "vite-plugin-mock": "2.9.6",
    "vite-plugin-pwa": "^0.19.0",
    "vite-plugin-svg-icons": "^2.0.1",
    "vite-plugin-vue-devtools": "1.0.0-rc.7",
    "vue-tsc": "^1.8.27"
  },
  browserslist: {
    production: [
      "> 1%",
      "not dead",
      "not op_mini all"
    ],
    development: [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  config: {
    commitizen: {
      path: "node_modules/cz-git"
    }
  }
};

// build/plugins/utils.ts
import path from "node:path";
import { exec } from "node:child_process";
var __vite_injected_original_import_meta_url = "file:///Users/fxzer/n/Vue3/x-wan-demo/build/plugins/utils.ts";
var dirname = path.dirname(new URL(__vite_injected_original_import_meta_url).pathname);
function getPackageSize(folder = "dist", callback) {
  const distPath = path.resolve(dirname, "../../", folder);
  const cmdStr = `du -sh ${distPath}`;
  exec(cmdStr, (err, stdout, stderr) => {
    if (err) {
      console.log(`get package size error:${stderr}`);
    } else if (callback && typeof callback === "function") {
      const size = stdout.split("	")[0];
      callback(size);
    }
  });
}

// build/plugins/print-build-info.ts
dayjs.extend(duration);
function setupPrintBuildInfo() {
  let config;
  let startTime;
  let endTime;
  let outDir;
  return {
    name: "vite:PrintBuildInfo",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      outDir = resolvedConfig.build?.outDir ?? "dist";
    },
    buildStart() {
      const { name: name2, version: version2, repository: { url } } = package_default;
      console.log(pc.bold(pc.green(`\u{1F44F}\u6B22\u8FCE\u4F7F\u7528${pc.blue(`[${name2}]:${version2}`)}${url} `)));
      if (config.command === "build")
        startTime = dayjs(/* @__PURE__ */ new Date());
    },
    closeBundle() {
      if (config.command !== "build")
        return;
      endTime = dayjs(/* @__PURE__ */ new Date());
      const timeString = dayjs.duration(endTime.diff(startTime)).format("mm\u5206ss\u79D2");
      getPackageSize(outDir, (size) => {
        console.log(
          pc.bold(pc.green(`\u{1F389}\u606D\u559C\u6253\u5305\u5B8C\u6210\uFF08\u603B\u7528\u65F6${timeString}\uFF0C\u603B\u4F53\u79EF${size}\uFF09`))
        );
      });
    }
  };
}

// build/plugins/create-svg-icon.ts
import { resolve } from "node:path";
import process from "node:process";
import { createSvgIconsPlugin } from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.1.3/node_modules/vite-plugin-svg-icons/dist/index.mjs";
function setupCreateSvgIcon() {
  return createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [resolve(process.cwd(), "src/assets/svg-icons")],
    // 指定symbolId格式  dir:用于区分svg-icons下二级文件夹有同名的svg
    symbolId: "icon-[dir]-[name]"
  });
}

// build/plugins/mock.ts
import { viteMockServe } from "file:///Users/fxzer/n/Vue3/x-wan-demo/node_modules/.pnpm/vite-plugin-mock@2.9.6_mockjs@1.1.0_rollup@2.79.1_vite@5.1.3/node_modules/vite-plugin-mock/dist/index.js";
function configMockPlugin({ isBuild }) {
  return viteMockServe({
    ignore: /^_/,
    mockPath: "mock",
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';

      setupProdMockServer();
      `
  });
}

// build/index.ts
function setupVitePlugins(viteEnv) {
  const { VITE_APP_TITLE, VITE_REPORT, VITE_INSPECT } = viteEnv;
  return [
    vue(),
    // vue 可以使用 jsx/tsx 语法
    vueJsx(),
    UnoCSS(),
    VITE_INSPECT && Inspect(),
    // Vite调试插件
    VueDevTools(),
    setupAtuoImport(viteEnv),
    setupAtuoComponent(viteEnv),
    setupPrintBuildInfo(),
    setupWebUpdateNotification(),
    // 按需自动安装 iconify 图标
    Icons({
      // scale: 0.8, // icon 大小缩放比例
      autoInstall: true,
      // 自动安装图标集
      defaultClass: "cursor-pointer wh-5"
      // 默认类名
    }),
    vueSetupExtend({}),
    // 创建打包压缩配置
    setupCompression(viteEnv),
    // 注入变量到 html 文件
    createHtmlPlugin({
      inject: {
        data: { title: VITE_APP_TITLE }
      }
    }),
    setupCreateSvgIcon(),
    configMockPlugin({ isBuild: viteEnv.VITE_USER_NODE_ENV === "build" }),
    // vitePWA
    setupVitePWA(viteEnv),
    // 是否生成包预览，分析依赖包大小做优化处理
    VITE_REPORT && visualizer({ gzipSize: true, brotliSize: true })
  ];
}

// vite.config.ts
var __vite_injected_original_dirname = "/Users/fxzer/n/Vue3/x-wan-demo";
var { dependencies, devDependencies, name, version } = package_default;
var __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs2().format("YYYY-MM-DD HH:mm:ss")
};
var vite_config_default = defineConfig(({ mode }) => {
  const root = process2.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@": resolve2(__vite_injected_original_dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
      // 之前的打包时间
    },
    css: {
      // preprocessorOptions: {
      //   scss: {
      //     additionalData: '@import "@/styles/var.scss";',
      //   },
      // },
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      proxy: setupProxy(viteEnv.VITE_PROXY)
    },
    plugins: setupVitePlugins(viteEnv),
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    build: {
      outDir: "dist",
      minify: "esbuild",
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2e3,
      // 2kb
      rollupOptions: {
        output: {
          // 静态资源打包分类
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvZ2V0RW52LnRzIiwgImJ1aWxkL3Byb3h5LnRzIiwgImJ1aWxkL2luZGV4LnRzIiwgImJ1aWxkL3BsdWdpbnMvY29tcHJlc3MudHMiLCAiYnVpbGQvcGx1Z2lucy9wd2EudHMiLCAiYnVpbGQvcGx1Z2lucy9hdXRvLWNvbXBvbmVudC50cyIsICJidWlsZC9wbHVnaW5zL2F1dG8tZWxlbWVudC1wbHVzLnRzIiwgImJ1aWxkL3BsdWdpbnMvYXV0by1pbXBvcnQtYXBpLnRzIiwgImJ1aWxkL3BsdWdpbnMvd2ViLXVwZGF0ZS1ub3RpZnkudHMiLCAiYnVpbGQvcGx1Z2lucy9wcmludC1idWlsZC1pbmZvLnRzIiwgInBhY2thZ2UuanNvbiIsICJidWlsZC9wbHVnaW5zL3V0aWxzLnRzIiwgImJ1aWxkL3BsdWdpbnMvY3JlYXRlLXN2Zy1pY29uLnRzIiwgImJ1aWxkL3BsdWdpbnMvbW9jay50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2Z4emVyL24vVnVlMy94LXdhbi1kZW1vL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5pbXBvcnQgdHlwZSB7IENvbmZpZ0VudiwgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xuaW1wb3J0IHsgd3JhcHBlckVudiB9IGZyb20gJy4vYnVpbGQvZ2V0RW52J1xuaW1wb3J0IHsgc2V0dXBQcm94eSB9IGZyb20gJy4vYnVpbGQvcHJveHknXG5pbXBvcnQgeyBzZXR1cFZpdGVQbHVnaW5zIH0gZnJvbSAnLi9idWlsZCdcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5cbmNvbnN0IHsgZGVwZW5kZW5jaWVzLCBkZXZEZXBlbmRlbmNpZXMsIG5hbWUsIHZlcnNpb24gfSA9IHBrZ1xuXG4vLyBcdTYzQTdcdTUyMzZcdTUzRjBcdTg5ODFcdThGOTNcdTUxRkFcdTc2ODRcdTY3ODRcdTVFRkFcdTRGRTFcdTYwNkZcbmNvbnN0IF9fQVBQX0lORk9fXyA9IHtcbiAgcGtnOiB7IGRlcGVuZGVuY2llcywgZGV2RGVwZW5kZW5jaWVzLCBuYW1lLCB2ZXJzaW9uIH0sXG4gIGxhc3RCdWlsZFRpbWU6IGRheWpzKCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXG59XG5cbi8qKiBAc2VlOiBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnLyAqL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XG4gIGNvbnN0IHJvb3QgPSBwcm9jZXNzLmN3ZCgpXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcm9vdClcbiAgY29uc3Qgdml0ZUVudiA9IHdyYXBwZXJFbnYoZW52KVxuXG4gIHJldHVybiB7XG4gICAgYmFzZTogdml0ZUVudi5WSVRFX1BVQkxJQ19QQVRILFxuICAgIHJvb3QsXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICAgICd2dWUtaTE4bic6ICd2dWUtaTE4bi9kaXN0L3Z1ZS1pMThuLmNqcy5qcycsXG4gICAgICB9LFxuICAgIH0sXG4gICAgZGVmaW5lOiB7XG4gICAgICBfX0FQUF9JTkZPX186IEpTT04uc3RyaW5naWZ5KF9fQVBQX0lORk9fXyksIC8vIFx1NEU0Qlx1NTI0RFx1NzY4NFx1NjI1M1x1NTMwNVx1NjVGNlx1OTVGNFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICAvLyBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAvLyAgIHNjc3M6IHtcbiAgICAgIC8vICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCJAL3N0eWxlcy92YXIuc2Nzc1wiOycsXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgICBwb3J0OiB2aXRlRW52LlZJVEVfUE9SVCxcbiAgICAgIG9wZW46IHZpdGVFbnYuVklURV9PUEVOLFxuICAgICAgY29yczogdHJ1ZSxcbiAgICAgIHByb3h5OiBzZXR1cFByb3h5KHZpdGVFbnYuVklURV9QUk9YWSksXG4gICAgfSxcbiAgICBwbHVnaW5zOiBzZXR1cFZpdGVQbHVnaW5zKHZpdGVFbnYpLFxuICAgIGVzYnVpbGQ6IHtcbiAgICAgIHB1cmU6IHZpdGVFbnYuVklURV9EUk9QX0NPTlNPTEUgPyBbJ2NvbnNvbGUubG9nJywgJ2RlYnVnZ2VyJ10gOiBbXSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXI6ICdkaXN0JyxcbiAgICAgIG1pbmlmeTogJ2VzYnVpbGQnLFxuICAgICAgLy8gXHU3OTgxXHU3NTI4IGd6aXAgXHU1MzhCXHU3RjI5XHU1OTI3XHU1QzBGXHU2MkE1XHU1NDRBXHVGRjBDXHU1M0VGXHU3NTY1XHU1RkFFXHU1MUNGXHU1QzExXHU2MjUzXHU1MzA1XHU2NUY2XHU5NUY0XG4gICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXG4gICAgICAvLyBcdTg5QzRcdTVCOUFcdTg5RTZcdTUzRDFcdThCNjZcdTU0NEFcdTc2ODQgY2h1bmsgXHU1OTI3XHU1QzBGXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsIC8vIDJrYlxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAvLyBcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTYyNTNcdTUzMDVcdTUyMDZcdTdDN0JcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2Z4emVyL24vVnVlMy94LXdhbi1kZW1vL2J1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZnh6ZXIvbi9WdWUzL3gtd2FuLWRlbW8vYnVpbGQvZ2V0RW52LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZC9nZXRFbnYudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RldkZuKG1vZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gbW9kZSA9PT0gJ2RldmVsb3BtZW50J1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9kRm4obW9kZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBtb2RlID09PSAncHJvZHVjdGlvbidcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGVzdEZuKG1vZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gbW9kZSA9PT0gJ3Rlc3QnXG59XG5cbi8vIFx1NTkwNFx1NzQwNiB2aXRlXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHVGRjBDXHU1QzA2XHU1MDNDXHU4RjZDXHU2MzYyXHU0RTNBXHU1QkY5XHU1RTk0XHU3Njg0XHU3QzdCXHU1NzhCXG5leHBvcnQgZnVuY3Rpb24gd3JhcHBlckVudihlbnZDb25mOiBSZWNvcmRhYmxlKTogVml0ZUVudiB7XG4gIGNvbnN0IHZpdGVFbnY6IGFueSA9IHt9XG5cbiAgZm9yIChjb25zdCBlbnZLZXkgb2YgT2JqZWN0LmtleXMoZW52Q29uZikpIHtcbiAgICBsZXQgZW52VmFsdWUgPSBlbnZDb25mW2VudktleV0ucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpXG4gICAgZW52VmFsdWUgPSBlbnZWYWx1ZSA9PT0gJ3RydWUnID8gdHJ1ZSA6IGVudlZhbHVlID09PSAnZmFsc2UnID8gZmFsc2UgOiBlbnZWYWx1ZVxuICAgIGlmIChlbnZLZXkgPT09ICdWSVRFX1BPUlQnKVxuICAgICAgZW52VmFsdWUgPSBOdW1iZXIoZW52VmFsdWUpXG4gICAgaWYgKGVudktleSA9PT0gJ1ZJVEVfUFJPWFknKVxuICAgICAgZW52VmFsdWUgPSBKU09OLnBhcnNlKGVudlZhbHVlKVxuXG4gICAgdml0ZUVudltlbnZLZXldID0gZW52VmFsdWVcbiAgfVxuICByZXR1cm4gdml0ZUVudlxufVxuXG4vKipcbiAqIEdldCB1c2VyIHJvb3QgZGlyZWN0b3J5XG4gKiBAcGFyYW0gZGlyIGZpbGUgcGF0aFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9vdFBhdGgoLi4uZGlyOiBzdHJpbmdbXSkge1xuICByZXR1cm4gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIC4uLmRpcilcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2Z4emVyL24vVnVlMy94LXdhbi1kZW1vL2J1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZnh6ZXIvbi9WdWUzL3gtd2FuLWRlbW8vYnVpbGQvcHJveHkudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2Z4emVyL24vVnVlMy94LXdhbi1kZW1vL2J1aWxkL3Byb3h5LnRzXCI7aW1wb3J0IHR5cGUgeyBQcm94eU9wdGlvbnMgfSBmcm9tICd2aXRlJ1xuXG50eXBlIFByb3h5SXRlbSA9IFtzdHJpbmcsIHN0cmluZ11cblxudHlwZSBQcm94eUxpc3QgPSBQcm94eUl0ZW1bXVxuXG50eXBlIFByb3h5VGFyZ2V0TGlzdCA9IFJlY29yZDxzdHJpbmcsIFByb3h5T3B0aW9ucz5cblxuLyoqIFx1NTIxQlx1NUVGQVx1NEVFM1x1NzQwNlx1RkYwQ1x1NzUyOFx1NEU4RVx1ODlFM1x1Njc5MCAuZW52LmRldmVsb3BtZW50IFx1NEVFM1x1NzQwNlx1OTE0RFx1N0Y2RSAqL1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2h0dHAtcGFydHkvbm9kZS1odHRwLXByb3h5I29wdGlvbnNcbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFByb3h5KHByb3h5TGlzdDogUHJveHlMaXN0ID0gW10pIHtcbiAgY29uc3QgcmV0OiBQcm94eVRhcmdldExpc3QgPSB7fVxuICBmb3IgKGNvbnN0IFtwcmVmaXgsIHRhcmdldF0gb2YgcHJveHlMaXN0KSB7XG4gICAgY29uc3QgaXNIdHRwcyA9IC9eaHR0cHM6XFwvXFwvLy50ZXN0KHRhcmdldClcbiAgICByZXRbcHJlZml4XSA9IHtcbiAgICAgIHRhcmdldCxcbiAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIHdzOiB0cnVlLFxuICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UocHJlZml4LCAnJyksXG4gICAgICBzZWN1cmU6ICFpc0h0dHBzLFxuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2Z4emVyL24vVnVlMy94LXdhbi1kZW1vL2J1aWxkL2luZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZC9pbmRleC50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4taHRtbCdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IHZ1ZVNldHVwRXh0ZW5kIGZyb20gJ3VucGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQtcGx1cy92aXRlJ1xuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xuXG5pbXBvcnQgSW5zcGVjdCBmcm9tICd2aXRlLXBsdWdpbi1pbnNwZWN0J1xuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcbmltcG9ydCB7IGNvbmZpZ01vY2tQbHVnaW4sIHNldHVwQXR1b0NvbXBvbmVudCwgc2V0dXBBdHVvSW1wb3J0LCBzZXR1cENvbXByZXNzaW9uLCBzZXR1cENyZWF0ZVN2Z0ljb24sIHNldHVwUHJpbnRCdWlsZEluZm8sIHNldHVwVml0ZVBXQSwgc2V0dXBXZWJVcGRhdGVOb3RpZmljYXRpb24gfSBmcm9tICcuL3BsdWdpbnMnXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFZpdGVQbHVnaW5zKHZpdGVFbnY6IFZpdGVFbnYpOiAoUGx1Z2luT3B0aW9uIHwgUGx1Z2luT3B0aW9uW10pW10ge1xuICBjb25zdCB7IFZJVEVfQVBQX1RJVExFLCBWSVRFX1JFUE9SVCwgVklURV9JTlNQRUNUIH0gPSB2aXRlRW52XG4gIHJldHVybiBbXG4gICAgdnVlKCksXG4gICAgLy8gdnVlIFx1NTNFRlx1NEVFNVx1NEY3Rlx1NzUyOCBqc3gvdHN4IFx1OEJFRFx1NkNENVxuICAgIHZ1ZUpzeCgpLFxuICAgIFVub0NTUygpLFxuICAgIFZJVEVfSU5TUEVDVCAmJiBJbnNwZWN0KCksIC8vIFZpdGVcdThDMDNcdThCRDVcdTYzRDJcdTRFRjZcbiAgICBWdWVEZXZUb29scygpLFxuICAgIHNldHVwQXR1b0ltcG9ydCh2aXRlRW52KSxcbiAgICBzZXR1cEF0dW9Db21wb25lbnQodml0ZUVudiksXG4gICAgc2V0dXBQcmludEJ1aWxkSW5mbygpLFxuICAgIHNldHVwV2ViVXBkYXRlTm90aWZpY2F0aW9uKCksXG4gICAgLy8gXHU2MzA5XHU5NzAwXHU4MUVBXHU1MkE4XHU1Qjg5XHU4OEM1IGljb25pZnkgXHU1NkZFXHU2ODA3XG4gICAgSWNvbnMoe1xuICAgICAgLy8gc2NhbGU6IDAuOCwgLy8gaWNvbiBcdTU5MjdcdTVDMEZcdTdGMjlcdTY1M0VcdTZCRDRcdTRGOEJcbiAgICAgIGF1dG9JbnN0YWxsOiB0cnVlLCAvLyBcdTgxRUFcdTUyQThcdTVCODlcdTg4QzVcdTU2RkVcdTY4MDdcdTk2QzZcbiAgICAgIGRlZmF1bHRDbGFzczogJ2N1cnNvci1wb2ludGVyIHdoLTUnLCAvLyBcdTlFRDhcdThCQTRcdTdDN0JcdTU0MERcbiAgICB9KSxcbiAgICB2dWVTZXR1cEV4dGVuZCh7fSksXG4gICAgLy8gXHU1MjFCXHU1RUZBXHU2MjUzXHU1MzA1XHU1MzhCXHU3RjI5XHU5MTREXHU3RjZFXG4gICAgc2V0dXBDb21wcmVzc2lvbih2aXRlRW52KSxcbiAgICAvLyBcdTZDRThcdTUxNjVcdTUzRDhcdTkxQ0ZcdTUyMzAgaHRtbCBcdTY1ODdcdTRFRjZcbiAgICBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICAgIGluamVjdDoge1xuICAgICAgICBkYXRhOiB7IHRpdGxlOiBWSVRFX0FQUF9USVRMRSB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBzZXR1cENyZWF0ZVN2Z0ljb24oKSxcbiAgICBjb25maWdNb2NrUGx1Z2luKHsgaXNCdWlsZDogdml0ZUVudi5WSVRFX1VTRVJfTk9ERV9FTlYgPT09ICdidWlsZCcgfSksXG4gICAgLy8gdml0ZVBXQVxuICAgIHNldHVwVml0ZVBXQSh2aXRlRW52KSxcbiAgICAvLyBcdTY2MkZcdTU0MjZcdTc1MUZcdTYyMTBcdTUzMDVcdTk4ODRcdTg5QzhcdUZGMENcdTUyMDZcdTY3OTBcdTRGOURcdThENTZcdTUzMDVcdTU5MjdcdTVDMEZcdTUwNUFcdTRGMThcdTUzMTZcdTU5MDRcdTc0MDZcbiAgICBWSVRFX1JFUE9SVCAmJiAodmlzdWFsaXplcih7IGd6aXBTaXplOiB0cnVlLCBicm90bGlTaXplOiB0cnVlIH0pIGFzIFBsdWdpbk9wdGlvbiksXG4gIF1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2Z4emVyL24vVnVlMy94LXdhbi1kZW1vL2J1aWxkL3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZC9wbHVnaW5zL2NvbXByZXNzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZC9wbHVnaW5zL2NvbXByZXNzLnRzXCI7aW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbidcbmltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcblxuLyoqIFx1NjgzOVx1NjM2RSBjb21wcmVzcyBcdTUzOEJcdTdGMjlcdTZBMjFcdTVGMEZcdTkxNERcdTdGNkVcdUZGMENcdTc1MUZcdTYyMTBcdTRFMERcdTU0MENcdTc2ODRcdTUzOEJcdTdGMjlcdTg5QzRcdTUyMTkgKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cENvbXByZXNzaW9uKHZpdGVFbnY6IFZpdGVFbnYpOiBQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSB7XG4gIGNvbnN0IHsgVklURV9DT01QUkVTU19BTEdPUklUSE0gPSAnbm9uZScsIFZJVEVfREVMRVRFX0NPTVBSRVNTX09SSUdJTl9GSUxFIH0gPSB2aXRlRW52XG4gIGNvbnN0IGFsZ29yaXRobUxpc3QgPSBWSVRFX0NPTVBSRVNTX0FMR09SSVRITS5zcGxpdCgnLCcpXG4gIGNvbnN0IHBsdWdpbnM6IFBsdWdpbk9wdGlvbltdID0gW11cbiAgLy8gXHU1MzhCXHU3RjI5XHU2QTIxXHU1RjBGXG4gIGNvbnN0IGNvbXByZXNzTW9kZU1hcCA9IHtcbiAgICBnemlwOiB2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgZXh0OiAnLmd6JyxcbiAgICAgIGFsZ29yaXRobTogJ2d6aXAnLFxuICAgICAgZGVsZXRlT3JpZ2luRmlsZTogVklURV9ERUxFVEVfQ09NUFJFU1NfT1JJR0lOX0ZJTEUsXG4gICAgfSksXG4gICAgYnJvdGxpOiB2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgZXh0OiAnLmJyJyxcbiAgICAgIGFsZ29yaXRobTogJ2Jyb3RsaUNvbXByZXNzJyxcbiAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IFZJVEVfREVMRVRFX0NPTVBSRVNTX09SSUdJTl9GSUxFLFxuICAgIH0pLFxuICB9XG4gIGlmIChhbGdvcml0aG1MaXN0LmluY2x1ZGVzKCdnemlwJykpXG4gICAgcGx1Z2lucy5wdXNoKGNvbXByZXNzTW9kZU1hcC5nemlwKVxuXG4gIGlmIChhbGdvcml0aG1MaXN0LmluY2x1ZGVzKCdicm90bGknKSlcbiAgICBwbHVnaW5zLnB1c2goY29tcHJlc3NNb2RlTWFwLmJyb3RsaSlcbiAgcmV0dXJuIHBsdWdpbnNcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2Z4emVyL24vVnVlMy94LXdhbi1kZW1vL2J1aWxkL3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZC9wbHVnaW5zL3B3YS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZnh6ZXIvbi9WdWUzL3gtd2FuLWRlbW8vYnVpbGQvcGx1Z2lucy9wd2EudHNcIjtpbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJ1xuaW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBWaXRlUFdBKHZpdGVFbnY6IFZpdGVFbnYpOiBQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSB7XG4gIGNvbnN0IHsgVklURV9BUFBfVElUTEU6IE5BTUUgfSA9IHZpdGVFbnZcbiAgLy8gcmV0dXJuIFZpdGVQV0Eoe1xuICAvLyAgIC8vIHN0cmF0ZWdpZXM6ICdpbmplY3RNYW5pZmVzdCcsXG4gIC8vICAgLy8gc3JjRGlyOiAncHVibGljJyxcbiAgLy8gICAvLyBmaWxlbmFtZTogJ3N3LmpzJyxcbiAgLy8gICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcbiAgLy8gICBtYW5pZmVzdDoge1xuICAvLyAgICAgbmFtZTogTkFNRSxcbiAgLy8gICAgIHNob3J0X25hbWU6IE5BTUUsXG4gIC8vICAgICB0aGVtZV9jb2xvcjogJyNlY2Y1ZmYnLFxuICAvLyAgICAgaWNvbnM6IFtcbiAgLy8gICAgICAge1xuICAvLyAgICAgICAgIHNyYzogJy9sb2dvcy9sb2dvXzUxMi5wbmcnLFxuICAvLyAgICAgICAgIHR5cGVzOiAnaW1nL3BuZycsXG4gIC8vICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgLy8gICAgICAgICBwdXJwb3NlOiAnYW55JyxcbiAgLy8gICAgICAgfSxcbiAgLy8gICAgICAge1xuICAvLyAgICAgICAgIHNyYzogJy9sb2dvcy9sb2dvXzI1Ni5wbmcnLFxuICAvLyAgICAgICAgIHR5cGVzOiAnaW1nL3BuZycsXG4gIC8vICAgICAgICAgc2l6ZXM6ICcyNTZ4MjU2JyxcbiAgLy8gICAgICAgICBwdXJwb3NlOiAnbWFza2FibGUnLFxuICAvLyAgICAgICB9LFxuICAvLyAgICAgICB7XG4gIC8vICAgICAgICAgc3JjOiAnL2xvZ29zL2xvZ29fMTkyLnBuZycsXG4gIC8vICAgICAgICAgdHlwZXM6ICdpbWcvcG5nJyxcbiAgLy8gICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAvLyAgICAgICAgIHB1cnBvc2U6ICdtYXNrYWJsZScsXG4gIC8vICAgICAgIH0sXG4gIC8vICAgICAgIHtcbiAgLy8gICAgICAgICBzcmM6ICcvbG9nb3MvbG9nb18xNDQucG5nJyxcbiAgLy8gICAgICAgICB0eXBlczogJ2ltZy9wbmcnLFxuICAvLyAgICAgICAgIHNpemVzOiAnMTQ0eDE0NCcsXG4gIC8vICAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJyxcbiAgLy8gICAgICAgfSxcbiAgLy8gICAgICAge1xuICAvLyAgICAgICAgIHNyYzogJy9sb2dvcy9sb2dvXzEyOC5wbmcnLFxuICAvLyAgICAgICAgIHR5cGVzOiAnaW1nL3BuZycsXG4gIC8vICAgICAgICAgc2l6ZXM6ICcxMjh4MTI4JyxcbiAgLy8gICAgICAgICBwdXJwb3NlOiAnbWFza2FibGUnLFxuICAvLyAgICAgICB9LFxuICAvLyAgICAgICB7XG4gIC8vICAgICAgICAgc3JjOiAnL2xvZ29zL2xvZ29fNzIucG5nJyxcbiAgLy8gICAgICAgICB0eXBlczogJ2ltZy9wbmcnLFxuICAvLyAgICAgICAgIHNpemVzOiAnNzJ4NzInLFxuICAvLyAgICAgICAgIHB1cnBvc2U6ICdtYXNrYWJsZScsXG4gIC8vICAgICAgIH0sXG4gIC8vICAgICAgIHtcbiAgLy8gICAgICAgICBzcmM6ICcvbG9nb3MvbG9nb180OC5wbmcnLFxuICAvLyAgICAgICAgIHR5cGVzOiAnaW1nL3BuZycsXG4gIC8vICAgICAgICAgc2l6ZXM6ICc0OHg0OCcsXG4gIC8vICAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJyxcbiAgLy8gICAgICAgfSxcbiAgLy8gICAgIF0sXG4gIC8vICAgfSxcbiAgLy8gICBpbnRlZ3JhdGlvbjoge1xuICAvLyAgICAgY29uZmlndXJlT3B0aW9ucyh2aXRlQ29uZmlnLCBvcHRpb25zKSB7XG4gIC8vICAgICAgIGlmICh2aXRlQ29uZmlnLmNvbW1hbmQgPT09ICdidWlsZCcpXG4gIC8vICAgICAgICAgb3B0aW9ucy5pbmNsdWRlQXNzZXRzID0gZmcuc3luYygnKiovKi4qJywgeyBjd2Q6IGpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3B1YmxpYycpLCBvbmx5RmlsZXM6IHRydWUgfSlcbiAgLy8gICAgIH0sXG4gIC8vICAgfSxcbiAgLy8gICBkZXZPcHRpb25zOiB7XG4gIC8vICAgICBlbmFibGVkOiBwcm9jZXNzLmVudi5QV0FfREVWID09PSAndHJ1ZScsXG4gIC8vICAgICB0eXBlOiAnbW9kdWxlJyxcbiAgLy8gICAgIG5hdmlnYXRlRmFsbGJhY2s6ICdpbmRleC5odG1sJyxcbiAgLy8gICB9LFxuICAvLyB9KVxuICByZXR1cm4gVml0ZVBXQSh7XG4gICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgbWFuaWZlc3Q6IHtcbiAgICAgIG5hbWU6IE5BTUUsXG4gICAgICBzaG9ydF9uYW1lOiBOQU1FLFxuICAgICAgdGhlbWVfY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgIGljb25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6ICcvbG9nb3MvbG9nb181MTIucG5nJyxcbiAgICAgICAgICB0eXBlOiAnaW1nL3BuZycsXG4gICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICBwdXJwb3NlOiAnYW55JyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogJy9sb2dvcy9sb2dvXzE5Mi5wbmcnLFxuICAgICAgICAgIHR5cGU6ICdpbWcvcG5nJyxcbiAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgIHB1cnBvc2U6ICdtYXNrYWJsZScsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZC9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZnh6ZXIvbi9WdWUzL3gtd2FuLWRlbW8vYnVpbGQvcGx1Z2lucy9hdXRvLWNvbXBvbmVudC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZnh6ZXIvbi9WdWUzL3gtd2FuLWRlbW8vYnVpbGQvcGx1Z2lucy9hdXRvLWNvbXBvbmVudC50c1wiOy8vIFx1ODFFQVx1NTJBOFx1NjMwOVx1OTcwMFx1NUJGQ1x1NTE2NVx1N0VDNFx1NEVGNlxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IHNldHVwQXR1b0VwQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRvLWVsZW1lbnQtcGx1cydcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwQXR1b0NvbXBvbmVudCh2aXRlRW52OiBWaXRlRW52KSB7XG4gIGNvbnN0IHsgVklURV9BVVRPX0VQIH0gPSB2aXRlRW52XG4gIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBcdTc2RjhcdTUxNzNcdTVFOTNcdTc2ODQgQVBJXG4gIHJldHVybiBDb21wb25lbnRzKHtcbiAgICByZXNvbHZlcnM6IFtcbiAgICAgIC4uLihWSVRFX0FVVE9fRVAgPyBzZXR1cEF0dW9FcENvbXBvbmVudCgpIDogW10pLFxuICAgIF0sXG4gICAgZGVlcDogdHJ1ZSwgLy8gXHU2NDFDXHU3RDIyXHU1QjUwXHU3NkVFXHU1RjU1XG4gICAgZGlyczogWydzcmMvY29tcG9uZW50cy9jb21tb24nXSwgLy8gXHU2MzA3XHU1QjlBXHU2MjZCXHU2M0NGXHU3Njg0XHU2NTg3XHU0RUY2XHU1OTM5XG4gICAgZHRzOiAnc3JjL3R5cGVzL2NvbXBvbmVudHMuZC50cycsXG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZC9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZnh6ZXIvbi9WdWUzL3gtd2FuLWRlbW8vYnVpbGQvcGx1Z2lucy9hdXRvLWVsZW1lbnQtcGx1cy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZnh6ZXIvbi9WdWUzL3gtd2FuLWRlbW8vYnVpbGQvcGx1Z2lucy9hdXRvLWVsZW1lbnQtcGx1cy50c1wiOy8vIEVsZW1lbnRQbHVzIFx1ODlFM1x1Njc5MFx1NTY2OFxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcblxuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXG5cbi8qKiAgXHU2MzA5XHU5NzAwXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBBUEkgKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEF0dW9FcEFwaSgpIHtcbiAgcmV0dXJuIFtcbiAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgRWxlbWVudCBQbHVzIFx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MFx1RkYwQ1x1NTk4Mlx1RkYxQUVsTWVzc2FnZSwgRWxNZXNzYWdlQm94Li4uIChcdTVFMjZcdTY4MzdcdTVGMEYpXG4gICAgRWxlbWVudFBsdXNSZXNvbHZlcih7IGltcG9ydFN0eWxlOiAnc2FzcycgfSksXG4gICAgLypcbiAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU1NkZFXHU2ODA3XHU3RUM0XHU0RUY2XHVGRjBDXHU0RjdGXHU3NTI4XHU2NUI5XHU1RjBGXHVGRjFBXG4gICAgICAgICAxOiA8aS1lcC1zaGFyZSAvPlxuICAgICAgICAgMjogPElFcFNoYXJlIC8+XG4gICAgICAgICAzOiA8ZWwtaWNvbiBjb2xvcj1cIiM0MDlFRkNcIj48SUVwU2hhcmUgLz48L2VsLWljb24+XG4gICAgICovXG4gICAgSWNvbnNSZXNvbHZlcigpLFxuICBdXG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uOiBcdTYzMDlcdTk3MDBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgRWxlbWVudCBQbHVzIFx1N0VDNFx1NEVGNlx1NTQ4Q1x1NTQ4Q1x1NTZGRVx1NjgwN1x1N0VDNFx1NEVGNlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBBdHVvRXBDb21wb25lbnQoKSB7XG4gIHJldHVybiBbXG4gICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTdFQzRcdTRFRjZcbiAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksXG4gICAgLy8gXHU4MUVBXHU1MkE4XHU2Q0U4XHU1MThDXHU1NkZFXHU2ODA3XHU3RUM0XHU0RUY2XG4gICAgSWNvbnNSZXNvbHZlcih7XG4gICAgICAvLyBlbmFibGVkQ29sbGVjdGlvbnM6IFsnZXAnXSxcbiAgICB9KSxcbiAgXVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZnh6ZXIvbi9WdWUzL3gtd2FuLWRlbW8vYnVpbGQvcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2Z4emVyL24vVnVlMy94LXdhbi1kZW1vL2J1aWxkL3BsdWdpbnMvYXV0by1pbXBvcnQtYXBpLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZC9wbHVnaW5zL2F1dG8taW1wb3J0LWFwaS50c1wiOy8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBBUElcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgeyBzZXR1cEF0dW9FcEFwaSB9IGZyb20gJy4vYXV0by1lbGVtZW50LXBsdXMnXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEF0dW9JbXBvcnQodml0ZUVudjogVml0ZUVudikge1xuICBjb25zdCB7IFZJVEVfQVVUT19FUCB9ID0gdml0ZUVudlxuICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgXHU3NkY4XHU1MTczXHU1RTkzXHU3Njg0IEFQSVxuICByZXR1cm4gQXV0b0ltcG9ydCh7XG4gICAgLy8gXHU2MzA3XHU1QjlBXHU4OTgxXHU4RkRCXHU4ODRDXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU3Njg0XHU2NTg3XHU0RUY2XHU3QzdCXHU1NzhCXG4gICAgaW5jbHVkZTogW1xuICAgICAgL1xcLlt0al1zeD8kLywgLy8gLnRzLCAudHN4LCAuanMsIC5qc3hcbiAgICAgIC9cXC52dWUkLyxcbiAgICAgIC9cXC52dWVcXD92dWUvLCAvLyAudnVlXG4gICAgICAvXFwubWQkLywgLy8gLm1kXG4gICAgXSxcbiAgICAvLyBcdTYzMDdcdTVCOUFcdTk3MDBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTc2ODRcdTVFOTNcbiAgICBpbXBvcnRzOiBbXG4gICAgICAvLyBcdTk4ODRcdTVCOUFcdTRFNDlcbiAgICAgICd2dWUnLCAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgVnVlIFx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MFx1RkYwQ1x1NTk4Mlx1RkYxQXJlZiwgcmVhY3RpdmUsIHRvUmVmIFx1N0I0OVxuICAgICAgJ3BpbmlhJyxcbiAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICdAdnVldXNlL2NvcmUnLFxuICAgIF0sXG4gICAgcmVzb2x2ZXJzOiBbXG4gICAgICAuLi4oVklURV9BVVRPX0VQID8gc2V0dXBBdHVvRXBBcGkoKSA6IFtdKSxcbiAgICBdLFxuICAgIC8vIGRpcnM6IFsnc3JjL2hvb2tzJ10sXG4gICAgLy8gXHU2MzA3XHU1QjlBXHU3NTFGXHU2MjEwXHU4REVGXHU1Rjg0IFx1NkNFOFx1RkYxQVx1OTcwMFx1NjYyRlx1NzZGOFx1NUJGOVx1OERFRlx1NUY4NFxuICAgIGR0czogJ3NyYy90eXBlcy9hdXRvLWltcG9ydHMuZC50cycsXG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZC9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZnh6ZXIvbi9WdWUzL3gtd2FuLWRlbW8vYnVpbGQvcGx1Z2lucy93ZWItdXBkYXRlLW5vdGlmeS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZnh6ZXIvbi9WdWUzL3gtd2FuLWRlbW8vYnVpbGQvcGx1Z2lucy93ZWItdXBkYXRlLW5vdGlmeS50c1wiO2ltcG9ydCB7IHdlYlVwZGF0ZU5vdGljZSB9IGZyb20gJ0BwbHVnaW4td2ViLXVwZGF0ZS1ub3RpZmljYXRpb24vdml0ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwV2ViVXBkYXRlTm90aWZpY2F0aW9uKCkge1xuICByZXR1cm4gd2ViVXBkYXRlTm90aWNlKHtcbiAgICBub3RpZmljYXRpb25Qcm9wczoge1xuICAgICAgdGl0bGU6ICdcdUQ4M0RcdURDNEIgXHU2NzA5XHU2NUIwXHU3MjQ4XHU2NzJDXHU0RTg2JyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnXHU3MEI5XHU1MUZCXHU1MjM3XHU2NUIwXHU5ODc1XHU5NzYyXHU4M0I3XHU1M0Q2XHU2NzAwXHU2NUIwXHU3MjQ4XHU2NzJDJyxcbiAgICAgIGJ1dHRvblRleHQ6ICdcdTUyMzdcdTY1QjAnLFxuICAgICAgZGlzbWlzc0J1dHRvblRleHQ6ICdcdTVGRkRcdTc1NjUnLFxuICAgIH0sXG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZC9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZnh6ZXIvbi9WdWUzL3gtd2FuLWRlbW8vYnVpbGQvcGx1Z2lucy9wcmludC1idWlsZC1pbmZvLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZC9wbHVnaW5zL3ByaW50LWJ1aWxkLWluZm8udHNcIjtpbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdHlwZSB7IERheWpzIH0gZnJvbSAnZGF5anMnXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnXG5pbXBvcnQgZHVyYXRpb24gZnJvbSAnZGF5anMvcGx1Z2luL2R1cmF0aW9uJ1xuaW1wb3J0IHBjIGZyb20gJ3BpY29jb2xvcnMnXG5pbXBvcnQgcGtnIGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbidcbmltcG9ydCB7IGdldFBhY2thZ2VTaXplIH0gZnJvbSAnLi91dGlscydcblxuZGF5anMuZXh0ZW5kKGR1cmF0aW9uKVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBQcmludEJ1aWxkSW5mbygpOiBQbHVnaW4ge1xuICBsZXQgY29uZmlnOiB7IGNvbW1hbmQ6IHN0cmluZyB9XG4gIGxldCBzdGFydFRpbWU6IERheWpzXG4gIGxldCBlbmRUaW1lOiBEYXlqc1xuICBsZXQgb3V0RGlyOiBzdHJpbmdcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndml0ZTpQcmludEJ1aWxkSW5mbycsXG4gICAgY29uZmlnUmVzb2x2ZWQocmVzb2x2ZWRDb25maWcpIHtcbiAgICAgIGNvbmZpZyA9IHJlc29sdmVkQ29uZmlnXG4gICAgICBvdXREaXIgPSByZXNvbHZlZENvbmZpZy5idWlsZD8ub3V0RGlyID8/ICdkaXN0J1xuICAgIH0sXG4gICAgYnVpbGRTdGFydCgpIHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgdmVyc2lvbiwgcmVwb3NpdG9yeTogeyB1cmwgfSB9ID0gcGtnXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2cocGMuYm9sZChwYy5ncmVlbihgXHVEODNEXHVEQzRGXHU2QjIyXHU4RkNFXHU0RjdGXHU3NTI4JHtwYy5ibHVlKGBbJHtuYW1lfV06JHt2ZXJzaW9ufWApfSR7dXJsfSBgKSkpXG4gICAgICBpZiAoY29uZmlnLmNvbW1hbmQgPT09ICdidWlsZCcpXG4gICAgICAgIHN0YXJ0VGltZSA9IGRheWpzKG5ldyBEYXRlKCkpXG4gICAgfSxcbiAgICBjbG9zZUJ1bmRsZSgpIHtcbiAgICAgIGlmIChjb25maWcuY29tbWFuZCAhPT0gJ2J1aWxkJylcbiAgICAgICAgcmV0dXJuXG4gICAgICBlbmRUaW1lID0gZGF5anMobmV3IERhdGUoKSlcbiAgICAgIGNvbnN0IHRpbWVTdHJpbmcgPSBkYXlqcy5kdXJhdGlvbihlbmRUaW1lLmRpZmYoc3RhcnRUaW1lKSkuZm9ybWF0KCdtbVx1NTIwNnNzXHU3OUQyJylcbiAgICAgIGdldFBhY2thZ2VTaXplKG91dERpciwgKHNpemU6IHN0cmluZykgPT4ge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZyhwYy5ib2xkKHBjLmdyZWVuKGBcdUQ4M0NcdURGODlcdTYwNkRcdTU1OUNcdTYyNTNcdTUzMDVcdTVCOENcdTYyMTBcdUZGMDhcdTYwM0JcdTc1MjhcdTY1RjYke3RpbWVTdHJpbmd9XHVGRjBDXHU2MDNCXHU0RjUzXHU3OUVGJHtzaXplfVx1RkYwOWApKSxcbiAgICAgICAgKVxuICAgICAgfSlcbiAgICB9LFxuICB9XG59XG4iLCAie1xuICBcIm5hbWVcIjogXCJ4LXdhbi1kZW1vXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuMVwiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJkZXNjcmlwdGlvblwiOiBcIm9wZW4gc291cmNlIG1hbmFnZW1lbnQgc3lzdGVtXCIsXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJmeHplclwiLFxuICAgIFwiZW1haWxcIjogXCIzMDEwMDk5MjkyQHFxLmNvbVwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2Z4emVyXCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vZnh6ZXIveC13YW4tZGVtby5naXRcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdEBnaXRodWIuY29tOmZ4emVyL3gtd2FuLWRlbW8uZ2l0XCJcbiAgfSxcbiAgXCJidWdzXCI6IHtcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9meHplci94LXdhbi1kZW1vLmdpdC9pc3N1ZXNcIlxuICB9LFxuICBcImVuZ2luZXNcIjoge1xuICAgIFwibm9kZVwiOiBcIj49MTguMC4wXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImRldi1wd2FcIjogXCJQV0FfREVWPXRydWUgdml0ZVwiLFxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJidWlsZDpkZXZcIjogXCJ2dWUtdHNjICYmIHZpdGUgYnVpbGQgLS1tb2RlIGRldmVsb3BtZW50XCIsXG4gICAgXCJidWlsZDp0ZXN0XCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkIC0tbW9kZSB0ZXN0XCIsXG4gICAgXCJyZXBvcnRcIjogXCJ2dWUtdHNjICYmIHZpdGUgYnVpbGQgLS1yZXBvcnRcIixcbiAgICBcImJ1aWxkOnByb1wiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZCAtLW1vZGUgcHJvZHVjdGlvblwiLFxuICAgIFwidHlwZTpjaGVja1wiOiBcInZ1ZS10c2MgLS1ub0VtaXQgLS1za2lwTGliQ2hlY2tcIixcbiAgICBcInByZXZpZXdcIjogXCJucG0gcnVuIGJ1aWxkOmRldiAmJiB2aXRlIHByZXZpZXdcIixcbiAgICBcInByZWluc3RhbGxcIjogXCJucHggb25seS1hbGxvdyBwbnBtXCIsXG4gICAgXCJyZWxlYXNlXCI6IFwic3RhbmRhcmQtdmVyc2lvblwiLFxuICAgIFwibGludFwiOiBcImVzbGludCAuXCIsXG4gICAgXCJsaW50ZlwiOiBcImVzbGludCAuIC0tZml4XCIsXG4gICAgXCJjb21taXRsaW50XCI6IFwiY29tbWl0bGludCAtLWNvbmZpZyBjb21taXRsaW50LmNvbmZpZy5janMgLWUgLVZcIixcbiAgICBcImNvbW1pdFwiOiBcImdpdCBhZGQgLUEgJiYgY3pnICYmIGdpdCBwdXNoXCIsXG4gICAgXCJjbGVhbjpjYWNoZVwiOiBcInJpbXJhZiBub2RlX21vZHVsZXMgJiYgcmltcmFmIC5lc2xpbnRjYWNoZSAmJiBybSAtcmYgZGlzdCAmJiBwbnBtIGluc3RhbGxcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZVwiOiBcIl4yLjMuMVwiLFxuICAgIFwiQHZ1ZXVzZS9jb3JlXCI6IFwiXjEwLjguMFwiLFxuICAgIFwiYW5pbWF0ZS5jc3NcIjogXCJeNC4xLjFcIixcbiAgICBcImF4aW9zXCI6IFwiXjEuNi43XCIsXG4gICAgXCJkYXlqc1wiOiBcIl4xLjExLjEwXCIsXG4gICAgXCJlY2hhcnRzXCI6IFwiXjUuNS4wXCIsXG4gICAgXCJlY2hhcnRzLWxpcXVpZGZpbGxcIjogXCJeMy4xLjBcIixcbiAgICBcImVsZW1lbnQtcGx1c1wiOiBcIl4yLjUuNlwiLFxuICAgIFwiZmFzdC1nbG9iXCI6IFwiXjMuMy4yXCIsXG4gICAgXCJtZDVcIjogXCJeMi4zLjBcIixcbiAgICBcIm5wcm9ncmVzc1wiOiBcIl4wLjIuMFwiLFxuICAgIFwicGluaWFcIjogXCJeMi4xLjdcIixcbiAgICBcInBpbmlhLXBsdWdpbi1wZXJzaXN0ZWRzdGF0ZVwiOiBcIl4zLjIuMVwiLFxuICAgIFwicHJpbnQtanNcIjogXCJeMS42LjBcIixcbiAgICBcInFzXCI6IFwiXjYuMTEuMlwiLFxuICAgIFwic29ydGFibGVqc1wiOiBcIl4xLjE1LjJcIixcbiAgICBcInYtd2F2ZVwiOiBcIl4yLjAuMFwiLFxuICAgIFwidnVlXCI6IFwiXjMuNC4xOVwiLFxuICAgIFwidnVlLWkxOG5cIjogXCJeOS45LjFcIixcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4yLjVcIixcbiAgICBcInZ1ZWRyYWdnYWJsZVwiOiBcIl40LjEuMFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBhbnRmdS9lc2xpbnQtY29uZmlnXCI6IFwiXjIuNi40XCIsXG4gICAgXCJAYW50ZnUvbmlcIjogXCJeMC4yMS4xMlwiLFxuICAgIFwiQGNvbW1pdGxpbnQvY2xpXCI6IFwiXjE4LjYuMVwiLFxuICAgIFwiQGNvbW1pdGxpbnQvY29uZmlnLWNvbnZlbnRpb25hbFwiOiBcIl4xOC42LjJcIixcbiAgICBcIkBpY29uaWZ5L2pzb25cIjogXCJeMi4yLjE4NFwiLFxuICAgIFwiQHBsdWdpbi13ZWItdXBkYXRlLW5vdGlmaWNhdGlvbi92aXRlXCI6IFwiXjEuNy4xXCIsXG4gICAgXCJAdHlwZXMvbWQ1XCI6IFwiXjIuMy41XCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMC4xMS4xOVwiLFxuICAgIFwiQHR5cGVzL25wcm9ncmVzc1wiOiBcIl4wLjIuM1wiLFxuICAgIFwiQHR5cGVzL3FzXCI6IFwiXjYuOS4xMVwiLFxuICAgIFwiQHR5cGVzL3NvcnRhYmxlanNcIjogXCJeMS4xNS44XCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjcuMC4yXCIsXG4gICAgXCJAdW5vY3NzL2VzbGludC1jb25maWdcIjogXCJeMC41OC41XCIsXG4gICAgXCJAdW5vY3NzL3ByZXNldC1yZW0tdG8tcHhcIjogXCJeMC41OC41XCIsXG4gICAgXCJAdW5vY3NzL3Jlc2V0XCI6IFwiXjAuNTguNVwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjUuMC40XCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI6IFwiXjMuMS4wXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xN1wiLFxuICAgIFwiY3otZ2l0XCI6IFwiXjEuOC4wXCIsXG4gICAgXCJjemdcIjogXCJeMS44LjBcIixcbiAgICBcImVzbGludFwiOiBcIl44LjU2LjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tZm9ybWF0XCI6IFwiXjAuMS4wXCIsXG4gICAgXCJleGVjYVwiOiBcIl44LjAuMVwiLFxuICAgIFwiaHVza3lcIjogXCJeOS4wLjExXCIsXG4gICAgXCJsaW50LXN0YWdlZFwiOiBcIl4xNS4yLjJcIixcbiAgICBcIm1vY2tqc1wiOiBcIl4xLjEuMFwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzVcIixcbiAgICBcInBvc3Rjc3MtaHRtbFwiOiBcIl4xLjYuMFwiLFxuICAgIFwicmltcmFmXCI6IFwiXjUuMC41XCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjogXCJeNS4xMi4wXCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuNzEuMVwiLFxuICAgIFwic3RhbmRhcmQtdmVyc2lvblwiOiBcIl45LjUuMFwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjMuM1wiLFxuICAgIFwidW5vY3NzXCI6IFwiXjAuNTguNVwiLFxuICAgIFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMC4xNy41XCIsXG4gICAgXCJ1bnBsdWdpbi1pY29uc1wiOiBcIl4wLjE4LjVcIixcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjYuMFwiLFxuICAgIFwidW5wbHVnaW4tdnVlLXNldHVwLWV4dGVuZC1wbHVzXCI6IFwiXjEuMC4xXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMS4zXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1jaGVja2VyXCI6IFwiXjAuNi40XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiOiBcIl4wLjUuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4taHRtbFwiOiBcIl4zLjIuMlwiLFxuICAgIFwidml0ZS1wbHVnaW4taW5zcGVjdFwiOiBcIl4wLjguM1wiLFxuICAgIFwidml0ZS1wbHVnaW4tbW9ja1wiOiBcIjIuOS42XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1wd2FcIjogXCJeMC4xOS4wXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjogXCJeMi4wLjFcIixcbiAgICBcInZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29sc1wiOiBcIjEuMC4wLXJjLjdcIixcbiAgICBcInZ1ZS10c2NcIjogXCJeMS44LjI3XCJcbiAgfSxcbiAgXCJicm93c2Vyc2xpc3RcIjoge1xuICAgIFwicHJvZHVjdGlvblwiOiBbXG4gICAgICBcIj4gMSVcIixcbiAgICAgIFwibm90IGRlYWRcIixcbiAgICAgIFwibm90IG9wX21pbmkgYWxsXCJcbiAgICBdLFxuICAgIFwiZGV2ZWxvcG1lbnRcIjogW1xuICAgICAgXCJsYXN0IDEgY2hyb21lIHZlcnNpb25cIixcbiAgICAgIFwibGFzdCAxIGZpcmVmb3ggdmVyc2lvblwiLFxuICAgICAgXCJsYXN0IDEgc2FmYXJpIHZlcnNpb25cIlxuICAgIF1cbiAgfSxcbiAgXCJjb25maWdcIjoge1xuICAgIFwiY29tbWl0aXplblwiOiB7XG4gICAgICBcInBhdGhcIjogXCJub2RlX21vZHVsZXMvY3otZ2l0XCJcbiAgICB9XG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2Z4emVyL24vVnVlMy94LXdhbi1kZW1vL2J1aWxkL3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZC9wbHVnaW5zL3V0aWxzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZC9wbHVnaW5zL3V0aWxzLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ25vZGU6Y2hpbGRfcHJvY2VzcydcblxuLy8gXHU4M0I3XHU1M0Q2XHU1RjUzXHU1MjREXHU4MTFBXHU2NzJDXHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XG5jb25zdCBkaXJuYW1lID0gcGF0aC5kaXJuYW1lKG5ldyBVUkwoaW1wb3J0Lm1ldGEudXJsKS5wYXRobmFtZSlcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhY2thZ2VTaXplKGZvbGRlciA9ICdkaXN0JywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gIGNvbnN0IGRpc3RQYXRoID0gcGF0aC5yZXNvbHZlKGRpcm5hbWUsICcuLi8uLi8nLCBmb2xkZXIpXG4gIGNvbnN0IGNtZFN0ciA9IGBkdSAtc2ggJHtkaXN0UGF0aH1gXG4gIGV4ZWMoY21kU3RyLCAoZXJyOiBhbnksIHN0ZG91dDogYW55LCBzdGRlcnI6IGFueSkgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBnZXQgcGFja2FnZSBzaXplIGVycm9yOiR7c3RkZXJyfWApIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH1cbiAgICBlbHNlXG4gICAgICBpZiAoY2FsbGJhY2sgJiYgdHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSBzdGRvdXQuc3BsaXQoJ1xcdCcpWzBdXG4gICAgICAgIGNhbGxiYWNrKHNpemUpXG4gICAgICB9XG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZC9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZnh6ZXIvbi9WdWUzL3gtd2FuLWRlbW8vYnVpbGQvcGx1Z2lucy9jcmVhdGUtc3ZnLWljb24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2Z4emVyL24vVnVlMy94LXdhbi1kZW1vL2J1aWxkL3BsdWdpbnMvY3JlYXRlLXN2Zy1pY29uLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xuXG4vLyBcdTc1MjhcdTRFOEVcdTc1MUZcdTYyMTAgc3ZnIFx1OTZFQVx1NzhBN1x1NTZGRVxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwQ3JlYXRlU3ZnSWNvbigpIHtcbiAgcmV0dXJuIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAvLyBcdTYzMDdcdTVCOUFcdTk3MDBcdTg5ODFcdTdGMTNcdTVCNThcdTc2ODRcdTU2RkVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzlcbiAgICBpY29uRGlyczogW3Jlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvc3ZnLWljb25zJyldLFxuICAgIC8vIFx1NjMwN1x1NUI5QXN5bWJvbElkXHU2ODNDXHU1RjBGICBkaXI6XHU3NTI4XHU0RThFXHU1MzNBXHU1MjA2c3ZnLWljb25zXHU0RTBCXHU0RThDXHU3RUE3XHU2NTg3XHU0RUY2XHU1OTM5XHU2NzA5XHU1NDBDXHU1NDBEXHU3Njg0c3ZnXG4gICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZC9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZnh6ZXIvbi9WdWUzL3gtd2FuLWRlbW8vYnVpbGQvcGx1Z2lucy9tb2NrLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9meHplci9uL1Z1ZTMveC13YW4tZGVtby9idWlsZC9wbHVnaW5zL21vY2sudHNcIjsvKipcbiAqIE1vY2sgcGx1Z2luIGZvciBkZXZlbG9wbWVudCBhbmQgcHJvZHVjdGlvbi5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbm5jd2Ivdml0ZS1wbHVnaW4tbW9ja1xuICovXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ01vY2tQbHVnaW4oeyBpc0J1aWxkIH06IHsgaXNCdWlsZDogYm9vbGVhbiB9KSB7XG4gIHJldHVybiB2aXRlTW9ja1NlcnZlKHtcbiAgICBpZ25vcmU6IC9eXy8sXG4gICAgbW9ja1BhdGg6ICdtb2NrJyxcbiAgICBsb2NhbEVuYWJsZWQ6ICFpc0J1aWxkLFxuICAgIHByb2RFbmFibGVkOiBpc0J1aWxkLFxuICAgIGluamVjdENvZGU6IGBcbiAgICAgIGltcG9ydCB7IHNldHVwUHJvZE1vY2tTZXJ2ZXIgfSBmcm9tICcuLi9tb2NrL19jcmVhdGVQcm9kdWN0aW9uU2VydmVyJztcblxuICAgICAgc2V0dXBQcm9kTW9ja1NlcnZlcigpO1xuICAgICAgYCxcbiAgfSlcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFEsU0FBUyxXQUFBQSxnQkFBZTtBQUNwUyxPQUFPQyxjQUFhO0FBRXBCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU9DLFlBQVc7OztBQ1lYLFNBQVMsV0FBVyxTQUE4QjtBQUN2RCxRQUFNLFVBQWUsQ0FBQztBQUV0QixhQUFXLFVBQVUsT0FBTyxLQUFLLE9BQU8sR0FBRztBQUN6QyxRQUFJLFdBQVcsUUFBUSxNQUFNLEVBQUUsUUFBUSxRQUFRLElBQUk7QUFDbkQsZUFBVyxhQUFhLFNBQVMsT0FBTyxhQUFhLFVBQVUsUUFBUTtBQUN2RSxRQUFJLFdBQVc7QUFDYixpQkFBVyxPQUFPLFFBQVE7QUFDNUIsUUFBSSxXQUFXO0FBQ2IsaUJBQVcsS0FBSyxNQUFNLFFBQVE7QUFFaEMsWUFBUSxNQUFNLElBQUk7QUFBQSxFQUNwQjtBQUNBLFNBQU87QUFDVDs7O0FDcEJPLFNBQVMsV0FBVyxZQUF1QixDQUFDLEdBQUc7QUFDcEQsUUFBTSxNQUF1QixDQUFDO0FBQzlCLGFBQVcsQ0FBQyxRQUFRLE1BQU0sS0FBSyxXQUFXO0FBQ3hDLFVBQU0sVUFBVSxjQUFjLEtBQUssTUFBTTtBQUN6QyxR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LE9BQU87QUFBQTtBQUFBLElBRXBCLGVBQWdCLFdBQVcsRUFBRSxVQUFVLE1BQU0sWUFBWSxLQUFLLENBQUM7QUFBQSxFQUNqRTtBQUNGOzs7QUhoREEsSUFBTSxtQ0FBbUM7QUFVekMsSUFBTSxFQUFFLGNBQWMsaUJBQWlCLE1BQU0sUUFBUSxJQUFJO0FBR3pELElBQU0sZUFBZTtBQUFBLEVBQ25CLEtBQUssRUFBRSxjQUFjLGlCQUFpQixNQUFNLFFBQVE7QUFBQSxFQUNwRCxlQUFlQyxPQUFNLEVBQUUsT0FBTyxxQkFBcUI7QUFDckQ7QUFHQSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBNkI7QUFDL0QsUUFBTSxPQUFPQyxTQUFRLElBQUk7QUFDekIsUUFBTSxNQUFNLFFBQVEsTUFBTSxJQUFJO0FBQzlCLFFBQU0sVUFBVSxXQUFXLEdBQUc7QUFFOUIsU0FBTztBQUFBLElBQ0wsTUFBTSxRQUFRO0FBQUEsSUFDZDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBS0MsU0FBUSxrQ0FBVyxPQUFPO0FBQUEsUUFDL0IsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixjQUFjLEtBQUssVUFBVSxZQUFZO0FBQUE7QUFBQSxJQUMzQztBQUFBLElBQ0EsS0FBSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU1MO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNLFFBQVE7QUFBQSxNQUNkLE1BQU0sUUFBUTtBQUFBLE1BQ2QsTUFBTTtBQUFBLE1BQ04sT0FBTyxXQUFXLFFBQVEsVUFBVTtBQUFBLElBQ3RDO0FBQUEsSUFDQSxTQUFTLGlCQUFpQixPQUFPO0FBQUEsSUFDakMsU0FBUztBQUFBLE1BQ1AsTUFBTSxRQUFRLG9CQUFvQixDQUFDLGVBQWUsVUFBVSxJQUFJLENBQUM7QUFBQSxJQUNuRTtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBO0FBQUEsTUFFUixzQkFBc0I7QUFBQTtBQUFBLE1BRXRCLHVCQUF1QjtBQUFBO0FBQUEsTUFDdkIsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBO0FBQUEsVUFFTixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInJlc29sdmUiLCAicHJvY2VzcyIsICJkYXlqcyIsICJwYXRoIiwgIm5hbWUiLCAidmVyc2lvbiIsICJkYXlqcyIsICJwcm9jZXNzIiwgInJlc29sdmUiXQp9Cg==
