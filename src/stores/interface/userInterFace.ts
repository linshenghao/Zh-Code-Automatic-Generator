/* 用户接口 */
interface User {
	user?: {
		// 用户id
		id?: string;
		// 组织id
		nursingHomeId?: string;
		// 真是姓名
		name?: string;
		userface?: string;
		// 用户名
		username?: string;
		// 昵称
		nickname?: string;
		phone?: number;
		telephone?: number;
		address?: string;
		// 当前组织对象
		nursingHome?: any;
		// 当前用户的所有组织列表
		nursingHomes?: any;
		remark?: string;
		// 角色列表
		roles?: any;
		roleIds?: any;
		shopBasic?: string;
		// 用户类型
		userType?: number;
		// 过期时间
		expiresTime?: number;
		// 身份证
		idCard?: string;
		gender?: string;
		birthday?: any;
		province?: string;
		city?: string;
		district?: string;
		userfaceValue?: string;
		[propName: string]: any;
	};
}
export interface UserState extends User {
	token: string;
	zhSystemLongTimerOut: number;
}
