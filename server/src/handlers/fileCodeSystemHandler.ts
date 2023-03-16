import FileCodeSystem from "../model/fileCodeSystem" 
import {rendeTemplate} from "../utils/render"

const  createFileCodeSystem = async (seq, params) =>  {
    const FileCodeSystemModel =  FileCodeSystem(seq)
		console.log("paramsparamsparams",params);
		
    // FileCodeSystemModel.sync();
    FileCodeSystemModel.create({
      fileName: params.fileName,
      fileTemplate: params.fileTemplate,
      filePropertyJson: params.filePropertyJson,
      fileCatalogId: params.fileCatalogId
    }).then(res => {
      console.log('创建', JSON.parse(JSON.stringify(res)));
    })
}

// 根据目录id获取模板列表
const  getFileCodeSystem = async (seq, id) =>  {
  const FileCodeSystemModel =  FileCodeSystem(seq)
  // FileCodeSystemModel.sync();
  return await FileCodeSystemModel.findAll({
		where: {
			file_catalog_id: id
		}
	})
}
// 根据模板id获取模板内容
const  getFileCodeSystemById = async (seq, id) =>  {
  const FileCodeSystemModel =  FileCodeSystem(seq)
  // FileCodeSystemModel.sync();
  return await FileCodeSystemModel.findOne({
		where: {
			id: id
		}
	})
}

const deleteFileCodeSystem = async (seq, id) => {
	const FileCodeSystemModel =  FileCodeSystem(seq)
	return await FileCodeSystemModel.destroy({
		where: {
			id: id
		}
	})
}

const updateFileCodeSystem = async (seq, params) => {
	const FileCodeSystemModel =  FileCodeSystem(seq)
	console.log("修改", params.id);
	const id = params.id
	return await FileCodeSystemModel.update({ fileName: params.fileName, fileTemplate: params.fileTemplate,filePropertyJson:params.filePropertyJson},{
		where: {
			id: id
		}
	})
}


const reviewFileTemplate = async (seq, id) => {
	const FileCodeSystemModel =  FileCodeSystem(seq)
	const data = await FileCodeSystemModel.findOne({
		where: {
			id: id
		}
	})
	console.log(data.filePropertyJson, JSON.parse(data.filePropertyJson))
	return rendeTemplate(data.fileTemplate, JSON.parse(data.filePropertyJson), data.fileName)
}


export default {
    createFileCodeSystem,
    getFileCodeSystem,
		deleteFileCodeSystem,
		updateFileCodeSystem,
		getFileCodeSystemById,
		reviewFileTemplate
}
