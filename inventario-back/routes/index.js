
const articulosRouter = require('./articulos.router')
const inventarioRouter = require('./inventario.router')
const categoriaRouter = require('./categorias.router')
const registroRouter = require('./registro.router')

function routerApi(app) {
  app.use('/articulos', articulosRouter)
  app.use('/inventarios', inventarioRouter)
  app.use('/categorias', categoriaRouter)
  app.use('/registro', registroRouter)
}

module.exports = routerApi;
