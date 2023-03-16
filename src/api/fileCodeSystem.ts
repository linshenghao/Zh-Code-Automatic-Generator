import uri from "./uri/index";

import http from "@/api/http";
import {FileCodeSystem} from "@/api/interface/index"

/**
 * @name 文件模板
 */
// * 获取文件模板列表
export const getFileCodeSystem = (id: string) => {
	return http.get(uri.fileCodeManage.fileCodeSystem.getAll + id);
};

// * 根据模板id获取模板数据
export const getFileCodeSystemById = (id: any) => {
	return http.get(uri.fileCodeManage.fileCodeSystem.getFileCodeSystemById + id);
};

// * 根据模板id获取模板数据
export const reviewFileTemplateById = (id: any) => {
	return http.get(uri.fileCodeManage.fileCodeSystem.reviewFileTemplate + id);
};

// * 新增文件模板列表
export const addFileCodeSystem = (params: FileCodeSystem.FileCodeSystemParams) => {
	return http.post(uri.fileCodeManage.fileCodeSystem.add, params);
};

// * 删除文件模板列表
export const deleteFileCodeSystem = (id: string) => {
	return http.delete(uri.fileCodeManage.fileCodeSystem.delete + id);
};

// * 修改文件模板列表
export const updateFileCodeSystem = (params: FileCodeSystem.FileCodeSystemParamsList) => {
	return http.put(uri.fileCodeManage.fileCodeSystem.update, params);
};

// * 下载文件模板
export const downloadFileZIP = (params: FileCodeSystem.FileCodeSystemParamsList) => {
	return http.get(uri.fileCodeManage.fileCodeSystem.downloadFileZIP, params);
};
