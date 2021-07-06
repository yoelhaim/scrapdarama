module.exports = (db, type) => {
  return db.define("users", {
    fullname_users: {
      type: type.STRING,
      allowNull: false,
    },
    email_users: {
      type: type.STRING,
      allowNull: false,
    },
    password_users: {
      type: type.STRING,
      allowNull: false,
    },
    date_users: {
      type: type.STRING,
      allowNull: false,
    },
    username_users: {
      type: type.STRING,
      allowNull: false,
    },
    country: {
      type: type.STRING,
      allowNull: false,
    },
  });
};
