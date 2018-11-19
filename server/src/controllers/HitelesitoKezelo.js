const {User} = require('../models')

module.exports = {
  async register (req, res) {
    try {
        const user = await User.create(req.body)
        res.send(user.toJSON())
        return res.status().send({
          success: 'Sikeres regisztráció'
        })
      } catch (err) {
        return res.status(400).send({
          error: 'Az email cím már foglalt.'
      })
    }
  },
  async login (req, res) {
    try {
        const {email, password} = req.body
        const user = await User.findOne({
          where: {
            email: email
          }
        })

        if (!user) {
          return res.stauts(403).send({
            error: 'A bejelentkezési adat helytelen'
          })
        }

        const isValid = password === user.password
        if (!isValid) {
          return res.status(403).send({
            error: 'A bejelentkezési adat helytelen'
          })
        }

        const userJson = user.toJSON()
        res.send({
          user: userJson
        })
      } catch (err) {
        res.status(500).send({
          error: 'Hiba a bejelentkezés során'
      })
    }
  }
}
