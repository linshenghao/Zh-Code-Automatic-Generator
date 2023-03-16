import fileCodeSystemHandler from "../handlers/fileCodeSystemHandler"
import path from 'path';
import send from 'koa-send'; // "koa-send": "^4.1.0"
import {renderAndSaveTemplate, rendeTemplate} from "../utils/render"
import syncFs from '../utils/syncFs';
import Config from '../config/Config';

async function createFileCodeSystem(ctx: any) {
	const {fileName,fileTemplate,filePropertyJson} = ctx.request.body;
	if(!fileName) {		
		ctx.body = ctx.util.refail("模板名不能为空");
		return false
	}
	if(!fileTemplate) {		
		ctx.body = ctx.util.refail("模板内容不能为空");
		return false
	}
	if(!filePropertyJson) {		
		ctx.body = ctx.util.refail("模板属性不能为空");
		return false
	}
    await fileCodeSystemHandler.createFileCodeSystem(ctx.sequelize, ctx.request.body)

    const data = {
        errCode: 0,
        errMsg: '添加数据库成功'
      }
      ctx.body = ctx.util.resuccess(data);
}

async function getFileCodeSystem(ctx: any) {
	const { id } = ctx.params
  const data = await fileCodeSystemHandler.getFileCodeSystem(ctx.sequelize, id)
  ctx.body = ctx.util.resuccess(data);
}

async function getFileCodeSystemById(ctx: any) {
	const { id } = ctx.params
  const data = await fileCodeSystemHandler.getFileCodeSystemById(ctx.sequelize, id)
  ctx.body = ctx.util.resuccess(data);
}

async function deleteFileCodeSystem(ctx: any) {
	const { id } = ctx.params
	const data = await fileCodeSystemHandler.deleteFileCodeSystem(ctx.sequelize, id)
	ctx.body = ctx.util.resuccess(data);
}

async function updateFileCodeSystem(ctx: any) {
	const data = await fileCodeSystemHandler.updateFileCodeSystem(ctx.sequelize, ctx.request.body)
	ctx.body = ctx.util.resuccess(data);
}

async function reviewFileTemplate(ctx: any) {
	const { id } = ctx.params
	const data = await fileCodeSystemHandler.reviewFileTemplate(ctx.sequelize, id)
	ctx.body = ctx.util.resuccess(data);
}

// 测试下载api
async function downloadFileZIP(ctx) {
	console.log("ctx", ctx.query);
	
	let uploadFileName = `${ctx.query.fileName}.zip`;  // 导出的文件名
	const data = await fileCodeSystemHandler.reviewFileTemplate(ctx.sequelize, ctx.query.id)
	let isExists = await syncFs.asyncExists(Config.TEMPLATE.DOWNLOAD_TEMPLATE_PATH +  uploadFileName);
	if(!isExists) {
		ctx.body = ctx.util.resuccess("失败");
	} else {
		ctx.attachment(uploadFileName);
		await send(ctx, uploadFileName, { root: Config.TEMPLATE.DOWNLOAD_TEMPLATE_PATH });
		// todo 删除文件
	}
}

export default {
    createFileCodeSystem,
    getFileCodeSystem,
		deleteFileCodeSystem,
		updateFileCodeSystem,
		getFileCodeSystemById,
		reviewFileTemplate,
		downloadFileZIP
}
