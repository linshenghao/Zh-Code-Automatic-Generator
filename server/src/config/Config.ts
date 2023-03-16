import REDIS_DB_NAME from './RedisDbName'
const isDev = process.env.NODE_ENV === 'development'
import path from "path"

export default class Config {
  // 是否是测试环境
  public static readonly IS_DEV = isDev
  public static readonly IP = isDev ? 'localhost' : 'localhost'
  // 服务器端口
  public static readonly HTTP_PORT = 9002
  // 接口前缀
  public static readonly API_PREFIX = '/api/'
  // 根目录
  public static readonly BASE = isDev ? 'src' : 'dist/src'
  // redis数据库
  public static readonly REDIS_DB_NAME = REDIS_DB_NAME
  // mysql配置
  public static readonly MYSQL = {
    DB_NAME: 'zh_code_automatic_generator',
    HOST: Config.IP,
    PORT: 3306,
    USER_NAME: 'root', // 根据实际情况切换到自己的数据库  superadmin/解决数据库版本太高的问题
    PASSWORD: '123456',
    CONNECTION_LIMIT: 60 * 60 * 1000,
    CONNECT_TIMEOUT: 1000 * 60 * 60 * 1000,
    ACQUIRE_TIMEOUT: 60 * 60 * 1000,
    TIMEOUT: 1000 * 60 * 60 * 1000,
    POOL: {
      max: 5, //连接池最大连接数量
      min: 0, //最小连接数量
      idle: 10000, //如果一个线程 10秒内么有被使用过的话，就释放
    }
  }
  // redis
  public static readonly REDIS = {
    PORT: 6379,
    HOST: Config.IP,
    PASSWORD: '123456',
    DB: 0,
  }
  // 默认时间格式
  public static readonly DEFAULT_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

  // 安全配置
  public static readonly SECURITY = {
    // token key
    SECRET_KEY: 'learn-koa-ts',
    // 过期时间
    EXPIRES_IN: 60 * 60 * 24 * 0.5,
    // 存储token的redis数据库名
    TOKEN_REDIS_DB: Config.REDIS_DB_NAME.TOKEN,
  }

    // 模板存储路径
    public static readonly TEMPLATE = {
      // 模板路径
      TEMPLATE_PATH: path.join(__dirname, '..', 'view/template/'), 
      // 备份模板存放路径
      BACK_UP_TEMPLATE_PATH: path.join(__dirname, '..', 'view/backupsTemplate/'),
      // 下载文件存放目录
      DOWNLOAD_TEMPLATE_PATH:  path.join(__dirname, '..', 'public/codeCreateDownloadZip/'), 
    }
}
