module.exports = (db, type) => {
  return db.define("favorite", {
    title_serie: {
      type: type.STRING,
      allowNull: false,
    },
    deleted: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
