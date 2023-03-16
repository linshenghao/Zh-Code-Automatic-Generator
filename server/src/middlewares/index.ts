'use strict'

import {backConfig}  from "../defaultConfig"
const ipFilter = require('ip-filter')
const pathToRegexp = require('path-to-regexp')
import sequelize from "../utils/mysql/sequelizePool"

const blackProjects: any = backConfig.blackList.projects
const blackIPs = backConfig.blackList.projects

const codeMap = {
  '-1': 'fail',
  '0': 'fail',
  '200': 'success',
  '401': 'token expired',
  '500': 'server error',
  '10001': 'params error'
}

const utilFn = {
  resuccess (data) {
    return {
      status: 1,
      success: true,
      message: codeMap['200'],
      data: data || null
    }
  },
  refail (message?: string, code?: number, data?: string) {
    return {
      status:  0,
      success: false,
      message: message || code && codeMap[code],
      data: data || null
    }
  }
}

export default class Middleware {
  static util (ctx, next): any {
    ctx.set('X-Request-Id', ctx.req.id)
    ctx.util = utilFn
    return next()
  }

  static ipFilter (ctx, next) : any{
    if (ipFilter(ctx.ip, blackIPs, {strict: false})) {
      ctx.body = utilFn.refail('请求频率太快，已被限制访问')
      return
    }
    return next()
  }

  static mockFilter (ctx, next): any {
    const pathNode: any = pathToRegexp('/mock/:projectId(.{24})/:mockURL*').exec(ctx.path)

    if (!pathNode) ctx.throw(404)
    if (blackProjects.indexOf(pathNode[1]) !== -1) {
      ctx.body = ctx.util.refail('接口请求频率太快，已被限制访问')
      return
    }

    ctx.pathNode = {
      projectId: pathNode[1],
      mockURL: `/${pathNode[2] || ""}`
    }

    return next()
  }

  static sequelizeFilter (ctx, next): any{
    ctx.sequelize = sequelize // 挂载上下文
    return next()
  }
}
