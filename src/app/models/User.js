module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    line_position: {
      type:DataTypes.INTEGER,
      default: 0
    },
  });

  return User;
};
