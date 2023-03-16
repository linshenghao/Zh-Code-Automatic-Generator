import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import { ID_INJECTION_KEY } from 'element-plus';
// element icons
import * as Icons from "@element-plus/icons-vue";

export default defineNuxtPlugin((nuxtApp) => {
	// 注册element Icons组件
Object.keys(Icons).forEach(key => {
	nuxtApp.vueApp.component(key, Icons[key as keyof typeof Icons]);
});
  nuxtApp.vueApp.use(ElementPlus);
  nuxtApp.vueApp.provide(ID_INJECTION_KEY,{
    prefix: Math.floor(Math.random() * 10000),
    current: 0,
  })
})
