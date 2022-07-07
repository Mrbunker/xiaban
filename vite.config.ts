import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import vitePluginImp from "vite-plugin-imp";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {},
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        modifyVars: {
          // '@brand-color': '#CF5659',
          "@primary-color": "#CF5659",
        },
      },
    },
  },
  plugins: [
    preact(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          libDirectory: "es",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
