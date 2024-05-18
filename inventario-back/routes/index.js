
const authRouter = require('./auth.router')
const articulosRouter = require('./articulos.router')
const inventarioRouter = require('./inventario.router')
const categoriaRouter = require('./categorias.router')
const registroRouter = require('./registro.router')
const proveedorRouter = require('./proveedores.router')

function routerApi(app) {
  app.use('/auth',authRouter)
  app.use('/articulos', articulosRouter)
  app.use('/proveedores', proveedorRouter)
  app.use('/inventarios', inventarioRouter)
  app.use('/categorias', categoriaRouter)
  app.use('/registro', registroRouter)
}

module.exports = routerApi;
