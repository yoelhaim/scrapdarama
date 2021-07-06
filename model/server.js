module.exports = (db, type) => {
  return db.define("server_serie", {
    server_serie: {
      type: type.STRING,
      allowNull: false,
    },
    name_server_serie: {
      type: type.STRING,
      allowNull: false,
    },
    detail_server_serie: {
      type: type.STRING,
      allowNull: false,
    },
    ep_server: {
      type: type.INTEGER,
      allowNull: false,
    },
  });
};
