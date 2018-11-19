const {Reservation} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const reservations = await Reservation.findAll({
        limit: 50
      })
      res.send(reservations)
    } catch (err) {
      res.status(500).send({
        error: 'Valami probléma lépett fel'
      })
    }
  },
  async post (req, res) {
    try {
      const reservation = await Reservation.create(req.body)
      res.send(reservation)
    } catch (err) {
      res.status(500).send({
        error: 'Valami probléma lépett fel'
      })
    }
  }
}
