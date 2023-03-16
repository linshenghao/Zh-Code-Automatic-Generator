import uri from "./uri/index";

import http from "@/api/http";
import { FileCatalog } from "@/api/interface/index"

/**
 * @name 文件管理模块
 */
// * 获取文件列表
export const getFileCatalog = () => {
	return http.get(uri.fileCodeManage.fileCatalog.getAll);
};

// * 新增文件列表
export const addFileCatalog = (params: FileCatalog.FileCatalogParams) => {
	return http.post(uri.fileCodeManage.fileCatalog.add, params);
};

// * 删除文件列表
export const deleteFileCatalog = (id: string) => {
	return http.delete(uri.fileCodeManage.fileCatalog.delete + id);
};

// * 修改文件列表
export const updateFileCatalog = (params: FileCatalog.FileCatalogParamsList) => {
	return http.put(uri.fileCodeManage.fileCatalog.update, params);
};
