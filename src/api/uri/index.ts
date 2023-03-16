export default {
    fileCodeManage:{
        fileCatalog: {
            add: "/fileCatalogController/add",
            getAll: "/fileCatalogController/getAll",
						delete: "/fileCatalogController/delete/",
						update: "/fileCatalogController/update"
        },
        fileCodeSystem: {
            add: "/fileCodeSystemController/add",
            getAll: "/fileCodeSystemController/getAll/",
						getFileCodeSystemById: "/fileCodeSystemController/getFileCodeSystemById/",
						delete: "/fileCodeSystemController/delete/",
						update: "/fileCodeSystemController/update",
						reviewFileTemplate: "/fileCodeSystemController/reviewFileTemplate/",
						downloadFileZIP: "/fileCodeSystemController/downloadFileZIP"
        }
    }
}
