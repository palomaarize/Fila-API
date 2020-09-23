module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
  });

  return User;
};
