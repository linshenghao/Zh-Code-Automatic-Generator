import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import { ResultData, defaultConfig } from "@/api/interface";
import { ResultEnum } from "@/enums/httpEnum";
import { checkStatus } from "./helper/checkStatus";
import { ElMessage } from "element-plus";
import { UserStore } from "@/stores/modules/user";
import { BASE_URL } from "@/config/env.url";
// import qs from "qs";
/**
 * pinia 错误使用说明示例
 * https://github.com/vuejs/pinia/discussions/971
 * https://github.com/vuejs/pinia/discussions/664#discussioncomment-1329898
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#single-page-applications
 */

/**
 * @Description:   如果token  过期，将返回的新token设置在请求头里
 * @effect    判断是否再重新去请求这个接口
 */

const isExpireAndSetToken = function (authorization: string) {
	const userStore = UserStore();
	const token: string = userStore.token;
	//判断是本地是否有token,没有或者有了但是与最新token不一样都重新设置token
	if ((token && token !== authorization) || !token) {
		//重新设置token的值
		userStore.setToken(authorization);
		// 重新设置 过期时间  登录后将过期时间设置为当前时间 + 系统过期时间（三小时）
		// let time = new Date().getTime() + systemConfig.zhSystemLongTimerOut;
		// userStore.setSystemTimeOut(time);
	}
};

/**
 * @Description: 状态操作
 */
const initPlantStatus = () => {
	const userStore = UserStore();
	userStore.clearUserInfo();
};

// const axiosCanceler = new AxiosCanceler();

const config = {
	// 默认地址请求地址，可在 .env 开头文件中修改
	baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间（10s）
	timeout: ResultEnum.TIMEOUT as number,
	// 跨域时候允许携带凭证
	withCredentials: true
};

class RequestHttp {
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		// 实例化axios
		this.service = axios.create(config);

		/**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
		 */
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				const userStore = UserStore();
				// * 将当前请求添加到 pending 中
				// axiosCanceler.addPending(config);
				// * 如果当前请求不需要显示 loading,在 api 服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
				config.headers!.noLoading || showFullScreenLoading();
				const token: string = userStore.token;
				return { ...config, headers: { ...config.headers, Authorization: token } };
				// return { ...config, headers: { "content-type": "application/json;charset=UTF-8'", Authorization: token } };
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);

		/**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data } = response;
				const userStore = UserStore();
				// 判断响应头token是否存在，存在后判断本地token和最新token是否一样，不一样直接替换
				if (response.headers && response.headers.authorization) {
					isExpireAndSetToken(response.headers.authorization);
				}
				tryHideFullScreenLoading();
				// * 登陆失效（status == 403）
				if (data.status == ResultEnum.UNAUTHORIZED) {
					ElMessage.error(data.msg);
					userStore.setToken("");
					// 登录失效，清空所有用户信息
					initPlantStatus();
					// router.replace(LOGIN_URL);
					return Promise.reject(data);
				}
				// * 判断status是否存在，全局错误信息拦截（防止下载文件的时候返回数据流，没有status，直接报错）
				if ("status" in data && data.status != ResultEnum.SUCCESS) {
					ElMessage.error(data.msg);
					return Promise.reject(data);
				}
				// * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
				return data;
			},
			async (error: AxiosError) => {
				const { response } = error;
				tryHideFullScreenLoading();
				// 请求超时单独判断，因为请求超时没有 response
				if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
				// 根据响应的错误状态码，做不同的处理
				if (response) checkStatus(response.status);
				// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
				return Promise.reject(error);
			}
		);
	}

	// * 常用请求方法封装
	get<T>(
		url: string,
		params?: object,
		_object = {},
		paramsConfig: defaultConfig = { middleware: false }
	): any {
		return this.service.get(`${paramsConfig.middleware ? "" : BASE_URL}${url}`, { params, ..._object });
	}
	post<T>(
		url: string,
		params?: object,
		_object = {},
		paramsConfig: defaultConfig = { middleware: false }
	): any {
		return this.service.post(`${paramsConfig.middleware ? "" : BASE_URL}${url}`, params, _object);
	}
	put<T>(
		url: string,
		params?: object,
		_object = {},
		paramsConfig: defaultConfig = { middleware: false }
	): any{
		return this.service.put(`${paramsConfig.middleware ? "" : BASE_URL}${url}`, params, _object);
	}
	delete<T>(
		url: string,
		params?: any,
		_object = {},
		paramsConfig: defaultConfig = { middleware: false }
	): any {
		return this.service.delete(`${paramsConfig.middleware ? "" : BASE_URL}${url}`, { params, ..._object });
	}
}

export default new RequestHttp(config);
