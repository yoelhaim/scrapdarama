const squelize = require("sequelize");
const db = require("../config/database");
const seriem = require("./serie");
const usersm = require("./users");
const serie_details = require("./serie_details");
const favs = require("./favorite");
const eps = require("./ep");
const servers = require("./server");
const { Sequelize } = require("sequelize");

const seriel = seriem(db, squelize);
const users = usersm(db, squelize);
const serie_detl = serie_details(db, Sequelize);
const favorite = favs(db, Sequelize);
const epl = eps(db, Sequelize);
const serverl = servers(db, Sequelize);

// const page = pages(db, squelize);

favorite.belongsTo(users);
favorite.belongsTo(serie_detl);

db.sync({
  force: false,
})
  .then((result) => {
    // console.log("success created");
  })
  .catch((err) => {});
module.exports = { users, seriel, serie_detl, favorite, epl, serverl };
