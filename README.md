
# zh-code-automatic-generator

### 前言 📖

- Zh Code Automatic Generator 是一个代码生成器项目，该项目前后端在同个目录，通过tsconfig区分前后端项目，前后端均用ts完成开发
- 前端基于 vite + nuxt3.0 + element Plus + ts + pinia 的 SSR 项目，开发目录 zh-code-automatic-generator/src
- 后端基于 koa2.0 全家桶 + art-template + ts，开发目录 zh-code-automatic-generator/server

### 代码生成器配置

- 代码生成器分成两个模块
>
> 1. 文件模块，可配置增删改查，目前默认支持导出三份文件（不可删除，可以维护），需要拓展可以选择新增需要导出的文件并编写导出模板导出文件。<br/>文件模块分成： <br/>fileName 文件名，<br/>fileSuffix 文件后缀，文件属性是一个数组对象 array[object]，导出文件的文件名是[fileName].[fileSuffix]，属性会自动填充到模板中去
> 2. 模板模块， 模板模块与文件模板做关联，每个文件对应一个模板，可以实现自定义模板，并根据文件模板属性做填充

### 运行说明

- 代码生成器分成两个模块
>
> 1. 项目采用 tsconfig.json 分项目编译的方式，前端tsconfig.json在根目录下，后端tsconfig.json在server目录下，分别控制两个项目的ts配置，由一个package.json维护项目依赖
> 2. node版本需要18.14.0，最好用pnpm 安装依赖避免依赖报错
