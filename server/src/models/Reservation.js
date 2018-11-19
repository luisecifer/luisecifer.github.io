module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    name: DataTypes.STRING,
    phonenumber: DataTypes.INTEGER,
    roomId: DataTypes.STRING,
    checkIn: DataTypes.TEXT,
    checkOut: DataTypes.TEXT
  })
  return Reservation
}
