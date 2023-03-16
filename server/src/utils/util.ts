import { format } from './date'
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

/**
 * 时间戳转换
 * @param inputTime
 * @param format  'yyyy-mm-dd'
 */
export function timeStampToDate(inputTime?: any, format?: any) {
	if (!inputTime) {
		return "";
	}

	if (typeof inputTime == "string") {
		// 传入格式 2020-02-25T08:11:17.000+0000(没算时区的) 2020-02-25T08:11:17
		// 正确格式 2020-02-25T08:11:17Z(Z:+8) 2020-02-17T12:25:23
		// 转换为 2020/02/25 08:11:17
		let havePlusIndex = inputTime.indexOf("+");
		if (havePlusIndex !== -1) {
			inputTime = inputTime.substring(0, havePlusIndex);
			inputTime = inputTime + "Z";
		}
	}

	let date = new Date(inputTime);
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let scored = date.getSeconds();

	let hoursStr = hours < 10 ? `0${hours}` : hours;
	let minutesStr = minutes < 10 ? `0${minutes}` : minutes;
	let scoredStr = scored < 10 ? `0${scored}` : scored;
	let monthStr = month < 10 ? `0${month}` : month;
	let dayStr = day < 10 ? `0${day}` : day;

	if (format === "yyyy") return year;

	if (format === "mm") return monthStr;

	if (format === "yyyy-mm") return year + "-" + monthStr;

	if (format === "yyyy-mm-dd") return year + "-" + monthStr + "-" + dayStr;

	if (format === "yyyy-mm-dd HH:mm:ss")
		return year + "-" + monthStr + "-" + dayStr + " " + hoursStr + ":" + minutesStr + ":" + scoredStr;

	if (format === "yyyy-mm-dd HH:mm") return year + "-" + monthStr + "-" + dayStr + " " + hoursStr + ":" + minutesStr;

	if (format === "mm-dd HH:mm") return monthStr + "-" + dayStr + " " + hoursStr + ":" + minutesStr;

	if (format === "HH:mm") return hoursStr + ":" + minutesStr;

	if (format === "HH:mm:ss") return hoursStr + ":" + minutesStr + ":" + scoredStr;

	return year + "-" + monthStr + "-" + dayStr + " " + hoursStr + ":" + minutesStr + ":" + scoredStr;
}


export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
	return key in object
}

/**
 * 下划线转驼峰
 * @param str
 * @returns
 */
export function lineToHump(str: string): string {
	if (str.startsWith('_')) {
	  return str
	}
	return str.replace(/\_(\w)/g, (all, letter: string) => letter.toUpperCase())
  }

/**
 * 将对象的所有属性由下划线转换成驼峰
 * @param obj
 * @returns
 */
export function lineToHumpObject(obj: Object) {
	let key: string
	const element: {
	  [key: string]: any
	} = {}
	for (key in obj) {
	  if (obj.hasOwnProperty(key)) {
		if (isValidKey(key, obj)) {
		  const value = obj[key]
		  if (typeof key === 'string' && (key as string).indexOf('_at') > -1) {
			element[lineToHump(key)] = format(value)
		  } else {
			element[lineToHump(key)] = value
		  }
		}
	  }
	}
	return {
	  ...element,
	}
  }

  