import hotMiddleware from 'webpack-hot-middleware'
import { PassThrough } from 'stream'

/*
    @Override koa-webpack-middleware/hotMiddleware
    fix application/octet-stream issue for any middleware after the hot middleware
    which causes Chrome to prompt for download.
    refs: https://github.com/leecade/koa-webpack-middleware/issues/23
*/
export default (compiler, opts) => {
  const expressMiddleware = hotMiddleware(compiler, opts)
  return async (ctx, next) => {
    let stream = new PassThrough()
    await expressMiddleware(ctx.req, {
      write: stream.write.bind(stream),
      writeHead: (status, headers) => {
        ctx.body = stream
        ctx.status = status
        ctx.set(headers)
      }
    }, next)
  }
}
