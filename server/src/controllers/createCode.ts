
import path from 'path';
import send from 'koa-send'; // "koa-send": "^4.1.0"
import {renderAndSaveTemplate} from "../utils/render"
import Config from '../config/Config';


// 使用中的模板
const apiTemplateArtPath: string = path.join(__dirname, '..', 'view/template/apiTemplate.art');

// 重置的模板路径
const resetApiTemplateArtPath: string = path.join(__dirname, '..', 'views/backupsTemplate/apiTemplate.art');


import syncFs from '../utils/syncFs';

export default class CreateCodeController {
  static async testApi(ctx) {
        console.log("ctx", ctx.request.body)
        ctx.body = ctx.util.resuccess("测试成功");
  }

  // 测试保存流文件
  static async testDownloadApi(ctx) {
      console.log("ctx", ctx.request.body)
      await renderAndSaveTemplate();

      ctx.body = ctx.util.resuccess("测试成功");
  }
    // 测试下载api
  static async testDownloadZIP(ctx) {
    let uploadFileName = `folderName.zip`;  // 导出的文件名
    let isExists = await syncFs.asyncExists(Config.TEMPLATE.DOWNLOAD_TEMPLATE_PATH +  uploadFileName);
    if(!isExists) {
      ctx.body = ctx.util.resuccess("失败");
    } else {
      ctx.attachment(uploadFileName);
      await send(ctx, uploadFileName, { root: Config.TEMPLATE.DOWNLOAD_TEMPLATE_PATH });
      // todo 删除文件
    }
  }
}
