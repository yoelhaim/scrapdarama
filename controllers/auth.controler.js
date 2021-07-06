const { scama, users, victims } = require("../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httperror = require("http-errors");

const createAccount = async (req, res, next) => {
  try {
    let username_u = req.body.fullname_users.replace(" ", "");
    let password = req.body.password_users;
    let email = req.body.email_users;
    let country = req.body.country;

    let checkname = await users.findAll({
      where: { username_users: username_u },
    });
    let checkemail = await users.findAll({
      where: { email_users: email },
    });

    if (checkname.length > 0) {
      res.json({
        message: "error create already username",
      });
    } else if (checkemail.length > 0) {
      res.statusCode = 505;
      res.json({
        code: 505,
        message: "error create already email",
      });
    } else {
      await users
        .create({
          fullname_users: req.body.fullname_users,
          username_users: username_u,
          password_users: password,
          email_users: email,
          country: country,
          date_users: "update",
        })
        .then((data) => {
          const token = jwt.sign(
            { email: req.body.email, username: username_u },
            "scamahackedfbinsta",
            // config.secret,
            {
              expiresIn: 864000, // expires in 24 hours
            }
          );
          res.statusCode = 200;
          res.json({
            code: 200,
            message: "succefully create",
            data,
            token,
          });
        })
        .catch((error) => {
          res.statusCode = 500;
          res.json({
            code: 500,
            message: "error create " + error.message,
          });
        });
    }
  } catch (error) {
    res.json({
      message: "error database " + error.message,
    });
  }
};
const login = async (req, res) => {
  try {
    let auth = await users
      .findAll({
        where: {
          email_users: req.body.email_users,
          password_users: req.body.password_users,
        },
      })
      .then((data) => {
        const token = jwt.sign(
          { email: data[0].email_users, username: data[0].username_users },
          "scamahackedfbinsta",
          // config.secret,
          {
            expiresIn: 864000, // expires in 24 hours
          }
        );
        res.statusCode = 200;
        res.json({
          code: 200,
          message: "succefully login",
          data,
          token,
        });
      })
      .catch((error) => {
        res.statusCode = 500;
        res.json({
          code: 500,
          message: "error login " + error.message,
        });
      });
  } catch (error) {
    res.statusCode = 404;
    res.json({
      message: "error msg" + error,
    });
  }
};
module.exports = { createAccount, login };
