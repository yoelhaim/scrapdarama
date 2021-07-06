module.exports = (db, type) => {
  return db.define("ep", {
    name_ep: {
      type: type.STRING,
      allowNull: false,
    },
    id_detail_ep: {
      type: type.STRING,
      allowNull: false,
    },
    ep_serie: {
      type: type.STRING,
      allowNull: false,
    },
    stt: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });
};
