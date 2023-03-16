import FileCatalog from "../model/fileCatalog" 

const  createFileCatalog = async (seq, params) =>  {
    const FileCatalogModel =  FileCatalog(seq)
    // FileCodeSystemModel.sync();
    FileCatalogModel.create({
      name: params.name,
      describe: params.describe,
    }).then(res => {
      console.log('创建', JSON.parse(JSON.stringify(res)));
    })
}

const  getFileCatalog = async (seq) =>  {
  const FileCatalogModel =  FileCatalog(seq)
  // FileCodeSystemModel.sync();
  return await FileCatalogModel.findAll({})
}

const deleteFileCatalog = async (seq, id) => {
	const FileCatalogModel =  FileCatalog(seq)
	return await FileCatalogModel.destroy({
		where: {
			id: id
		}
	})
}

const updateFileCatalog = async (seq, params) => {
	const FileCatalogModel =  FileCatalog(seq)
	return await FileCatalogModel.update({ name: params.name, describe: params.describe},{
		where: {
			id: params.id
		}
	})
}

export default {
    createFileCatalog,
    getFileCatalog,
		deleteFileCatalog,
		updateFileCatalog
}
