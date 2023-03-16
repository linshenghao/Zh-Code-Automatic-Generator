const template = require('art-template');
import Config from '../config/Config';
import syncFs from './syncFs';
import path  from 'path'
import JSZip from 'jszip';
// 获取模板路径
const apiTemplateArtPath = path.join(__dirname, '..', 'view/template/apiTemplate.art');
// 模板保存路径
const downloadTemplatePath = path.join(__dirname, '..', 'public/codeCreateDownloadZip');
// 渲染api 模板
export const renderApiTemplate = function(): any {
    const htmlStr =  template(apiTemplateArtPath, {
        user: {
            name: 'aui'
        }
    });
    return htmlStr;
}

// 渲染api 模板
export const renderAndSaveTemplate = async function() {
    const htmlStr = template.render('<h1>hi, {{value}}.</h1>', {value: '555555555555'});
    let zip = new JSZip();
      // 判断文件夹是否存在
    let isExists =  await syncFs.asyncExists(downloadTemplatePath + `/folderName`);
    if (!isExists) { 
        await  syncFs.asyncMkdir(downloadTemplatePath + `/folderName`);
    }
    let isFileCreate =  await syncFs.asyncWriteFile(downloadTemplatePath + `/folderName/fileName.vue`, htmlStr)

    if (isFileCreate) {
        await syncFs.startZIP(Config.TEMPLATE.DOWNLOAD_TEMPLATE_PATH,  "folderName", zip);  // 压缩文件
        return true
    }else{
        return false
    }
}

// 渲染api 模板
export const rendeTemplate = async function(templateStr,jsonData, fileName) {
	const htmlStr = template.render(templateStr, jsonData);
	let zip = new JSZip();
		// 判断文件夹是否存在
	let isExists =  await syncFs.asyncExists(downloadTemplatePath + `/${fileName}`);
	if (!isExists) { 
			await  syncFs.asyncMkdir(downloadTemplatePath + `/${fileName}`);
	}
	let isFileCreate =  await syncFs.asyncWriteFile(downloadTemplatePath + `/folderName/${fileName}.vue`, htmlStr)

	if (isFileCreate) {
			await syncFs.startZIP(Config.TEMPLATE.DOWNLOAD_TEMPLATE_PATH,  `${fileName}`, zip);  // 压缩文件
			return htmlStr
	}else{
			return htmlStr
	}
}
