// module.exports = {
//   database: process.env.DB_NAME,
//   dialect: process.env.DB_DIALECT || "sqlite",
//   storage: "./__tests__/database.sqlite",
//   operatorsAliases: false,
//   logging: false,
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// };

module.exports = {
  database: "api",
  dialect: "sqlite",
  storage:
    process.env.NODE_ENV === "test"
      ? "./__tests__/database.sqlite"
      : "./src/database/database.sqlite",
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
