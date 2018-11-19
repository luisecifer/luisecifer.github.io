const HitelesitoKezelo = require('./controllers/HitelesitoKezelo')
const HitelesitoKezeloIranyelv = require('./policies/HitelesitoKezeloIranyelv')
const FoglalasKezelo = require('./controllers/FoglalasKezelo')

module.exports = (app) => {
  app.post('/register',
    HitelesitoKezeloIranyelv.register,
    HitelesitoKezelo.register)

    app.post('/login',
      HitelesitoKezelo.login)

    app.get('/browse',
      FoglalasKezelo.index)

    app.post('/reservation',
      FoglalasKezelo.post)
}
