//import StorageHelp from '@/utils/storageHelp'
//let getUserForCookie = StorageHelp.getStorage(StorageHelp.systemUser || "[]", "object");
import { defineStore } from "pinia";
import { UserState } from "../interface/userInterFace";
// import piniaPersistConfig from "@/config/piniaPersist";
// AuthStore
export const UserStore = defineStore({
	id: "UserState",
	state: (): UserState => ({
		// 用户信息
		user: {},
		// token
		token: "",
		// 系统过期时间
		zhSystemLongTimerOut: 0
	}),
	getters: {
		// 处理权限按钮数据，用于方便控制按钮
		userObj: state => {
			return state.user;
		},
		// 后台返回的菜单数据，用于方便控制路由跳转时权限（这里已经处理成一维数组了）
		tokenSrt: state => {
			return state.token;
		}
	},
	actions: {
		// setAuthButtons
		setUser(userInfo: any) {
			this.user = userInfo;
		},
		// 设置token
		setToken(token: string) {
			this.token = token;
		},
		// 设置新token过期时间
		setSystemTimeOut(time: number) {
			this.zhSystemLongTimerOut = time;
		},
		clearUserInfo() {}
	},
	// persist: piniaPersistConfig("UserState")
});
