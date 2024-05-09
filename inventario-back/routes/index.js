
const reservasRouter = require('./reservas.router')

function routerApi(app) {
  app.use('/api-reservas', reservasRouter)
}

module.exports = routerApi;
