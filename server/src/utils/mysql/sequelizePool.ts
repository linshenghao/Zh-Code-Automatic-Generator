// import mysql from 'mysql'
import mysqlConfing from './mysqlConfing'
const Sequelize = require("sequelize")

console.log('init sequelize...')

const sequelize = new Sequelize(mysqlConfing.database, mysqlConfing.user, mysqlConfing.password, {
    host: mysqlConfing.host,
    port: mysqlConfing.port,
    dialect: 'mysql',
    pool: mysqlConfing.pool,
    define: {
        // schema和schemaDelimiter为表前缀，不需要可以删除
        // schema: 'koa',
        // 连接字符
        // schemaDelimiter: '-',
        // 是否自动添加时间戳
        timestamps: false,
        freezeTableName: true,
				underscored: true
    }
})


// 测试是否能连通
sequelize.authenticate().then(() => {
    console.log("数据库连接成功");
}).catch(err => {
    console.log("数据库连接失败", err);
});
export default sequelize
