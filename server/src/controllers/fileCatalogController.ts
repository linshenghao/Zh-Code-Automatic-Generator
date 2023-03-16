import fileCatalogHandler from "../handlers/fileCatalogHandler"

async function createFileCatalog(ctx: any) {
	console.log("ctx", ctx.request.body)
	const {name} = ctx.request.body;
	if(!name) {		
		ctx.body = ctx.util.refail("模板名不能为空");
		return false
	}
	await fileCatalogHandler.createFileCatalog(ctx.sequelize, ctx.request.body)
	const data = {
			errCode: 0,
			errMsg: '添加成功'
	}
	ctx.body = ctx.util.resuccess(data);
}

async function getFileCatalog(ctx: any) {
    const data = await fileCatalogHandler.getFileCatalog(ctx.sequelize)
    ctx.body = ctx.util.resuccess(data);
}

async function deleteFileCatalog(ctx: any) {
	const { id } = ctx.params
	const data = await fileCatalogHandler.deleteFileCatalog(ctx.sequelize, id)
	ctx.body = ctx.util.resuccess(data);
}

async function updateFileCatalog(ctx: any) {
	const data = await fileCatalogHandler.updateFileCatalog(ctx.sequelize, ctx.request.body)
	ctx.body = ctx.util.resuccess(data);
}

export default {
    createFileCatalog,
    getFileCatalog,
		deleteFileCatalog,
		updateFileCatalog
}
