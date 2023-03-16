// 文件目录管理
import {Sequelize, DataTypes} from 'sequelize'

const FileCatalog = function (seq) {
    // 新建表user
    const FileCatalogModal = seq.define('file_catalog', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      describe: DataTypes.STRING,
    }, {
    })
    return FileCatalogModal
}
export default FileCatalog
