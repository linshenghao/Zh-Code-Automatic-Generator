import Koa from "koa"
import consola from "consola"
import {backConfig}  from "./defaultConfig"
import {renderApiTemplate} from "./utils/render"
import onerror from 'koa-onerror'
import middleware from './middlewares/index'
import path  from 'path'
import cors  from '@koa/cors'
import koaBody  from 'koa-body'
const validate = require('koa-validate')
// import util  from './util'
import staticCache  from 'koa-static-cache'
import routerConfig  from './controllers/index'
const app = new Koa();

// util.init();
onerror(app)
validate(app)

function serve (prefix, filePath) {
  const staticPath: any = path.resolve(__dirname, filePath);
  console.log(staticPath)
  return staticCache(path.resolve(__dirname, filePath), {
    prefix: prefix,
    gzip: true,
    dynamic: true,
    maxAge: 60 * 60 * 24 * 30
  })
}

// Import and Set Nuxt.js options

async function start () {
    
  const host: any =  process.env.HOST || '127.0.0.1';
  const port: any =  process.env.PORT || 3002;
  
  // 后端 路由
    app
      .use(middleware.ipFilter)
      .use(middleware.sequelizeFilter)
      .use(middleware.util)
      .use(serve('/public', './public'))
      .use(cors({ credentials: true, maxAge: 2592000 }))
 /*     .use(koaJwt({ secret: jwtSecret }).unless((ctx) => {
        if (/^\/api/.test(ctx.path)) {
          return pathToRegexp([
            '/api/u/login',
            '/api/u/register',
            '/api/mock/by_projects',
            '/api/mock/export',
            '/api/wallpaper',
            '/api/distributedCodeGenerate/createFrontCodeByProperty',
            '/api/distributedCodeGenerate/uploadFrontCodeByProperty',
            '/api/distributedCodeGenerate/saveTemplate',
            '/api/distributedCodeGenerate/resetTemplate',
            '/api/distributedCodeGenerate/testApi'
          ]).test(ctx.path)
        }
        return true
      }))*/
      .use(koaBody({ multipart: true }))
      .use(routerConfig.routes())
      .use(routerConfig.allowedMethods());
  // 获取代理是否代理
  app.proxy = backConfig.proxy;

  app.use((ctx: any) => {
    // ctx.status = 200
    // ctx.respond = false // Bypass Koa's built-in response handling
    // ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
