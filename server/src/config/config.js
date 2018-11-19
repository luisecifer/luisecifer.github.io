module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'RoomReservation',
    user: process.env.USER || 'RoomReservation',
    password: process.env.DB_PASS || 'RoomReservation',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './RoomReservation.sqlite'
    }
  }
}
