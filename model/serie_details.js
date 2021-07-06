module.exports = (db, type) => {
  return db.define("serie_details", {
    title_serie: {
      type: type.STRING,
      allowNull: false,
    },
    country_serie: {
      type: type.STRING,
      allowNull: false,
    },
    desc_serie: {
      type: type.STRING,
      allowNull: false,
    },
    img_serie: {
      type: type.STRING,
      allowNull: false,
    },
    views_serie: {
      type: type.STRING,
      allowNull: false,
    },
    date_serie: {
      type: type.STRING,
      allowNull: false,
    },
    namedrama__serie: {
      type: type.STRING,
      allowNull: false,
    },
    id_serie_detail: {
      type: type.STRING,
      allowNull: false,
    },
    autrename: {
      type: type.STRING,
      allowNull: false,
    },
    allep: {
      type: type.STRING,
      allowNull: false,
    },
    views: {
      type: type.INTEGER,
      allowNull: false,
    },
  });
};
