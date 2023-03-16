import Router from 'koa-router'
import CreateCodeController from "./createCode"
import fileCodeSystemController from './fileCodeSystemController';
import fileCatalogController from './fileCatalogController';

// 顾客路由
const apiRouter = new Router({ prefix: '/api' });


export default  apiRouter
  .get('/distributedCodeGenerate/testApi',CreateCodeController.testApi)
  .get('/distributedCodeGenerate/testDownloadApi',CreateCodeController.testDownloadApi)
  .get('/distributedCodeGenerate/testDownloadZIP',CreateCodeController.testDownloadZIP)

  .post('/fileCodeSystemController/add', fileCodeSystemController.createFileCodeSystem)
  .get('/fileCodeSystemController/getAll/:id', fileCodeSystemController.getFileCodeSystem)
	.get('/fileCodeSystemController/getFileCodeSystemById/:id', fileCodeSystemController.getFileCodeSystemById)
	.delete('/fileCodeSystemController/delete/:id', fileCodeSystemController.deleteFileCodeSystem)
	.put('/fileCodeSystemController/update', fileCodeSystemController.updateFileCodeSystem)
	.get('/fileCodeSystemController/reviewFileTemplate/:id', fileCodeSystemController.reviewFileTemplate)
	.get('/fileCodeSystemController/downloadFileZIP', fileCodeSystemController.downloadFileZIP)

  .post('/fileCatalogController/add', fileCatalogController.createFileCatalog)
  .get('/fileCatalogController/getAll', fileCatalogController.getFileCatalog)
	.delete('/fileCatalogController/delete/:id', fileCatalogController.deleteFileCatalog)
	.put('/fileCatalogController/update', fileCatalogController.updateFileCatalog)
