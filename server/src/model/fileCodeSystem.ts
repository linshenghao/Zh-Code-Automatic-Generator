// 文件模板管理
import {Sequelize, DataTypes} from 'sequelize'

const FileCodeSystem = function (seq) {
    // 新建表user
    const FileCodeSystemModal = seq.define('file_code_system', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      fileName: {
				type: DataTypes.STRING,
				field: 'file_name',
			},
      fileTemplate: {
				type: DataTypes.TEXT,
				field: 'file_template',
			},
      filePropertyJson: {
				type: DataTypes.STRING,
				field: 'file_property_json',
			},
      fileCatalogId: {
        type: DataTypes.UUID,
				field: 'file_catalog_id',
      }
    }, {
    })
    return FileCodeSystemModal
}
export default FileCodeSystem
