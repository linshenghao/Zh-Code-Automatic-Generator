import headConfig from "./src/config/head"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import'
import { resolve } from "path";
// https://nuxt.com/docs/api/configuration/nuxt-config
const lsh_ip = "127.0.0.1";
const lsh_port = "3002";
export default defineNuxtConfig({
  srcDir: 'src/',
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      title: headConfig.data.title,
      htmlAttrs: {
        lang: 'zh'
      },
      meta: [
        { name: 'content-type', content: 'text/html;charset=utf-8' },
        { name: 'keywords', content:  headConfig.data.keywords},
        { name: 'description', content:  headConfig.data.description},
        { ['http-equiv']: 'x-ua-compatible', content: 'ie=edge,chrome=1' },
        { name: 'baidu-site-verification', content: '' },
        { property: 'og:title', content: headConfig.data.title },
        { property: 'og:keywords', content: headConfig.data.keywords },
        { property: 'og:description', content: headConfig.data.description },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'icon-logo-success.png' }
        /* 客户端引用bootstrap方式，不推荐
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css', integrity: 'sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css', integrity: '', crossorigin: 'anonymous' },
        */
      ],
      script: [
      
        /* 客户端引用bootstrap方式，不推荐；在script和link中，使用body: true配置将其添加到body里最后元素
        { body: true, src: 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js', integrity: 'sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3', crossorigin: 'anonymous' },
        { body: true, src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js', integrity: 'sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk', crossorigin: 'anonymous' },
        */
      ],
    },
  },
  modules: [
    // ...
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
   // 引入elemnet plus样式
  css: ['element-plus/dist/index.css', 'element-plus/theme-chalk/display.css', { src: '@/assets/styles/common.scss', lang: 'scss' }],
   // 插件方式引入element plus组件
  plugins: ["@/plugins/element-plus"],
  // 代理服务器
  nitro: {
    devProxy: {
      '/api/': {
        target: `http://${lsh_ip}:${lsh_port}/api`,
        changeOrigin: true
      }
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/variable-global.scss";@import "@/assets/styles/mixin-global.scss";@import "@/assets/styles/percentStyles.scss";'	
        }
      }
    },
		 // 强制预构建插件包
		 optimizeDeps: {
			include: [
				`monaco-editor/esm/vs/language/json/json.worker`,
				`monaco-editor/esm/vs/language/css/css.worker`,
				`monaco-editor/esm/vs/language/html/html.worker`,
				`monaco-editor/esm/vs/language/typescript/ts.worker`,
				`monaco-editor/esm/vs/editor/editor.worker`
			], 
		},
    plugins: [
      // * 使用 svg 图标
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
			createStyleImportPlugin({
				resolves: [
					VxeTableResolve()
				],
			})
    ]
  }
})
