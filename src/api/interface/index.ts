// * 请求响应参数(不包含data)
export interface Result {
	status: string;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data: T;
}

// * 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	page: number;
	size: number;
	totalPage: number;
	totalResult: number;
}

// * 分页请求参数
export interface ReqPage {
	page: number;
	size: number;
}

// * 登录模块
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
		validateCode?: string;
		randomStr?: string;
		userType?: number;
	}
	export interface ResLogin {
		access_token: string;
	}
	export interface ResAuthButtons {
		[key: string]: {
			[key: string]: boolean;
		};
	}
}

// * 用户管理模块
export namespace User {
	export interface ReqGetUserParams extends ReqPage {
		username: string;
		gender: number;
		idCard: string;
		email: string;
		address: string;
		createTime: string[];
		status: number;
	}
	export interface ResUserList {
		id: string;
		username: string;
		gender: string;
		age: number;
		idCard: string;
		email: string;
		address: string;
		createTime: string;
		status: number;
		avatar: string;
		children?: ResUserList[];
	}
	export interface ResStatus {
		userLabel: string;
		userValue: number;
	}
	export interface ResGender {
		genderLabel: string;
		genderValue: number;
	}
	export interface ResDepartment {
		id: string;
		name: string;
		children?: ResDepartment[];
	}
}

// * 文件上传模块
export namespace Upload {
	export interface ResFileUrl {
		fileUrl: string;
	}
}

/**
 * api 额外参数，拓展多项目配置
 * @param middleware 是否取消前缀配置  初始化为false
 * @param loadingMessage 加载文本提示  默认加载中...
 * @param rootData 是否自己处理状态码  初始化为false
 */

export interface defaultConfig {
	middleware?: boolean;
	loadingMessage?: string;
	rootData?: boolean;
}

export interface Icon {
	iconList: any;
}


export namespace FileCatalog {
	export interface FileCatalogParams {
		name?: string;
		describe?: string;
	}
	
	export interface FileCatalogParamsList extends FileCatalogParams{
		id?: string;
	}
}


export namespace FileCodeSystem {
	export interface FileCodeSystemParams {
		fileName?: string;
		fileTemplate?: string;
		filePropertyJson?: string;
		fileCatalogId?: string | string[];
	}
	
	export interface FileCodeSystemParamsList extends FileCodeSystemParams{
		id?: string;
	}
}
