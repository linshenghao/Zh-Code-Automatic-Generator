import path from 'path';
import koaSend from 'koa-send'; // "koa-send": "^4.1.0"
import glob from "glob";
import fs from "fs";

const zipRootPath = path.join(__dirname, '..', 'view/codeCreateDownloadZip/');
console.log("zipRootPathzipRootPath",zipRootPath)

// 检测文件是否存在
const asyncExists = function (path: string) {
    return new Promise((resolve, reject) => {
        fs.exists(path, function(exists) {
            console.log(exists ? "文件夹存在" : "文件夹不存在");
            if (exists) {
                resolve(true)
            }else{
                resolve(false)
            }
        });
    });
}

// 创建文件夹
const asyncMkdir = function (path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, function(err) {
            console.log(err ? "创建成功" : "创建失败");
            if (err) {
                console.log('文件夹已经存在',err)
                resolve(false)
            }else{
                console.log('创建成功');
                resolve(true)
            }
        });
    });
}

// 写入数据到文件
const asyncWriteFile = function (path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content,function(err) {
            if (err) {
                console.log('写入异常',err)
                resolve(false)
            }else{
                console.log('写入成功');
                resolve(true)
            }
        });
    });
}

/**
 * 删除文件
 * @param  {string} fileName 文件名 file.js
 */
const asyncDelFile = function  (path: string, fileName: string) {
    return new Promise((resolve, reject) => {
        fs.unlink(path, function (err: any) {
            if (err) {
                console.log('删除文件失败：' + fileName);
                resolve(false)
            } else {
                resolve(true)
            }
        });
    })
}

// 循环读取文件
 //读取目录及文件
 const readDir = function (obj, nowPath: string, zip?: any) {
         const files = fs.readdirSync(nowPath);//读取目录中的所有文件及文件夹（同步操作）
         files.forEach(function (fileName, index) {//遍历检测目录中的文件
                 console.log(fileName, index);//打印当前读取的文件名
                 const fillPath = nowPath + "/" + fileName;
                 const file = fs.statSync(fillPath);//获取一个文件的属性
                 if (file.isDirectory()) {//如果是目录的话，继续查询
                         const dirlist = zip.folder(fileName);//压缩对象中生成该目录
                         readDir(dirlist, fillPath);//重新检索目录文件
                     } else {
                         obj.file(fileName, fs.readFileSync(fillPath));//压缩目录添加文件
                     }
             });
}

/**
 * @param  folderName download 下的文件夹下的文件
 */
 function startZIP(path: string, folderName: string, zip) {
         return new Promise((resolve, reject) => {
            const targetDir: any = path + folderName;
            console.log("targetDir",targetDir)
            readDir(zip, targetDir);
            zip.generateAsync({//设置压缩格式，开始打包
                type: "nodebuffer",//nodejs用
                compression: "DEFLATE",//压缩算法
                compressionOptions: {//压缩级别
                    level: 9
                }
            }).then(function (content) {
                    fs.writeFileSync(path + `/${folderName}.zip`, content, "utf-8");//将打包的内容写入 当前目录下的 folderName.zip中
                    resolve(true)
            });
         })
     
}

export default {
    asyncExists,
    asyncMkdir,
    asyncWriteFile,
    asyncDelFile,
    startZIP
};
