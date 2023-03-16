const fs = require("fs")

// 复制静态文件目录
fs.cp('server/src/view', 'server/dist/src/view', { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
});