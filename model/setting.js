module.exports = (db, type) => {
  return db.define("settings", {
    namesite: {
      type: type.STRING,
      allowNull: false,
    },
    email: {
      type: type.STRING,
      allowNull: false,
    },
    link: {
      type: type.STRING,
      allowNull: false,
    },
    privacy: {
      type: type.STRING,
      allowNull: false,
    },

    fb: {
      type: type.STRING,
      allowNull: false,
    },
    instagram: {
      type: type.STRING,
      allowNull: false,
    },
    twitter: {
      type: type.STRING,
      allowNull: false,
    },
    youtube: {
      type: type.STRING,
      allowNull: false,
    },
    telegram: {
      type: type.STRING,
      allowNull: false,
    },
    paypal: {
      type: type.STRING,
      allowNull: false,
    },
  });
};
