const { serie, serie_det, favorite, users } = require("../model");
const httperror = require("http-errors");

const posts = async (req, res, next) => {
  const post = await serie_det.findAll({
    offset: parseInt(req.params.start),
    limit: parseInt(req.params.count),
  });
  res.send(post);
};

const allfav = async (req, res, next) => {
  try {
    console.log(req.user);
    if (parseInt(req.params.id) != req.user.id) {
      throw httperror.Forbidden("error permission");
    }
    const post = await favorite.findAll({
      where: {
        userId: req.params.id,
        deleted: 0,
      },
      include: [
        { model: serie_det },
        {
          model: users,
          attributes: { exclude: ["password_users", "email_users"] },
        },
      ],
    });
    res.send(post);
  } catch (error) {
    next(error);
  }
};
const addfav = async (req, res, next) => {
  try {
    if (parseInt(req.body.userId) != req.user.id) {
      throw httperror.Forbidden("error permission");
    }
    const check = await favorite.findAll({
      where: {
        userId: req.body.userId,
        serieDetailId: req.body.serieDetailId,
      },
    });
    if (check.length > 0) {
      res.statusCode = 404;
      res.json({
        code: 404,
        message: "elraedy add",
      });
    } else {
      const body = req.body;
      const adds = await favorite.create(body).then((data) => {
        res.json({
          code: 200,
          message: "success add fav",
          data,
        });
      });
    }
  } catch (error) {
    next(error.message);
    console.log(error.message);
  }
};
const deletedFAv = async (req, res, next) => {
  try {
    if (parseInt(req.params.id) != req.user.id) {
      throw httperror.Forbidden("error permission");
    }
    const posttrash = await favorite
      .update(
        {
          deleted: 1,
        },
        {
          where: { userId: req.params.id, id: req.params.post },
        }
      )
      .then((data) => {
        res.json({
          code: 200,
          message: " success deleted",
        });
      });
  } catch (error) {
    next(error.message);
  }
};

module.exports = { posts, addfav, allfav, deletedFAv };
