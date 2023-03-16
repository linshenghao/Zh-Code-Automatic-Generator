import { defineStore, createPinia } from "pinia";
import { GlobalState } from "./interface";
// import piniaPersistConfig from "@/config/piniaPersist";
// import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: "GlobalState",
	// state: 返回对象的函数
	state: (): GlobalState => ({
		recordPrevThemeConfig: {}
	}),
	getters: {},
	actions: {
		// 在切换移动端布局模式的时候，用于记录当前的模式，在回到pc布局的时候沿用上一次被记住的布局
		setRecordPrevThemeConfig(themeConfig: any) {
			this.recordPrevThemeConfig = themeConfig;
		}
	},
	// persist: piniaPersistConfig("GlobalState")
});

// piniaPersist(持久化)
const pinia = createPinia();
// pinia.use(piniaPluginPersistedstate);

export default pinia;
