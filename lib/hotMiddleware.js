'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _stream = require('stream');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*
    @Override koa-webpack-middleware/hotMiddleware
    fix application/octet-stream issue for any middleware after the hot middleware
    which causes Chrome to prompt for download.
    refs: https://github.com/leecade/koa-webpack-middleware/issues/23
*/
exports.default = function (compiler, opts) {
  var expressMiddleware = (0, _webpackHotMiddleware2.default)(compiler, opts);
  return function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
      var stream;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              stream = new _stream.PassThrough();
              _context.next = 3;
              return expressMiddleware(ctx.req, {
                write: stream.write.bind(stream),
                writeHead: function writeHead(status, headers) {
                  ctx.body = stream;
                  ctx.status = status;
                  ctx.set(headers);
                }
              }, next);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};