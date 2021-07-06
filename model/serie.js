module.exports = (db, type) => {
  return db.define("serie", {
    id__film_gen: {
      type: type.STRING,
      allowNull: false,
    },
    img__film: {
      type: type.STRING,
      allowNull: false,
    },
    title_film: {
      type: type.STRING,
      allowNull: false,
    },
  });
};
