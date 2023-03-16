import { ResultEnum } from "@/enums/httpEnum";
/**
 * @Description: 生成随机数
 * @param minNum 最小数值
 * @param maxNum 最大数值
 */
export function randomNum(minNum: any, maxNum: any) {
    switch (arguments.length) {
      case 1:
        const minNumStr: any = Math.random() * minNum + 1
        return parseInt(minNumStr, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
}

export const isSuccess = (status: number) => {
	return status == ResultEnum.SUCCESS 
} 

/**
 * 深拷贝函数
 * @param obj     要拷贝的目标
 */
export function deepClone(obj: any, hash = new WeakMap()) {
	if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
	if (obj instanceof Date) return new Date(obj);
	if (obj instanceof RegExp) return new RegExp(obj);
	// 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
	if (typeof obj !== "object") return obj;
	// 是对象的话就要进行深拷贝
	if (hash.get(obj)) return hash.get(obj);
	let cloneObj = new obj.constructor();
	// 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
	hash.set(obj, cloneObj);
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			// 实现一个递归拷贝
			cloneObj[key] = deepClone(obj[key], hash);
		}
	}
	return cloneObj;
}
