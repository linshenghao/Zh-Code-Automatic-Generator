import path from 'path';
import fs from 'fs';
import send from 'koa-send'; // "koa-send": "^4.1.0"
import glob from "glob";
import JSZip from 'jszip';
import syncFs from './syncFs.js';

const config = {
    // 文件根目录
    dir: path.join(__dirname,'..', 'download/folderName/')
}

const zipRootPath = path.join(__dirname,'..', 'download/');
/**
 * 把mtl文件和obj文件打包成zip压缩包
 * @param  {} fileName 不带文件后缀的文件名
 * @param  {} {delSource = false } = {} 是否删除源文件
 */
function toZipOfMtlObj (fileName, { delSource = false } = {}) {
    console.log('压缩文件',fileName);
    var zip = new JSZip();
    var extArr = ['.js', '.vue'];
    console.log("getFullFileName(fileName)",getFullFileName(fileName))
    extArr.forEach(async (ext) => {
        let file = fileName + ext;
        let content: any = await getFileContent(fileName + ext);
        console.log(content,file)
        if (content) {
            zip.file(file, content);
        }
    })
    // 压缩
    zip.generateAsync({
        // 压缩类型选择nodebuffer，在回调函数中会返回zip压缩包的Buffer的值，再利用fs保存至本地
        type: "nodebuffer",
        // 压缩算法
        compression: "DEFLATE",
        compressionOptions: {
            level: 9
        }
    }).then(async function (content) {
        console.log('写入压缩文件',content);
        let zip = fileName + '.zip';
        // 写入磁盘
        let writeFileBool = await syncFs.asyncWriteFile(getFullFileName(zip),content);

        // 是否删除源文件
        if (writeFileBool===true) {
            console.log(zip + '压缩成功');
        }else{
            console.log(zip + '压缩失败');
        }
        if (delSource) {
            extArr.forEach(ext => {
                syncFs.asyncDelFile(getFullFileName(config.dir),fileName + ext);
            })
        }
    });
}

/**
 * 获取完整文件路径
 * @param  {string} fileName 文件名
 */

function getFullFileName (fileName) {
    return path.join(config.dir, fileName);
}

/**
 * 获取文件内容
 * @param  {string} fileName 文件名 file.mtl
 */
function getFileContent (fileName) {
    // 指定encoding会返回一个string，否则返回一个Buffer
    return new Promise(async (resolve, reject) => {
        let hasFile = await syncFs.asyncExists(getFullFileName(fileName));
        console.log('hasFile',hasFile)
        if (hasFile){
            let content = fs.readFileSync(getFullFileName(fileName), { encoding: "utf-8" });
            resolve(content);
        }else {
            reject(false)
        }
    });

}

export default {
    toZipOfMtlObj:toZipOfMtlObj
};

