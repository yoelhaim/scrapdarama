const { ep, server, serie_det } = require("../model");
const { Op } = require("sequelize");
const httperror = require("http-errors");
const getEp = async (req, res, next) => {
  try {
    const postep = await ep.findAll({
      where: { id_detail_ep: req.params.id },
    });
    const findvi = await serie_det.findOne({
      where: { id_serie_detail: req.params.id },
    });
    let vv = findvi.views;
    const updatePost = await serie_det.update(
      {
        views: vv + 1,
      },
      { where: { id_serie_detail: req.params.id } }
    );
    res.send(postep);
  } catch (error) {
    next(error.message);
    console.log(error.message);
  }
};
const getServr = async (req, res, next) => {
  try {
    const postep = await server.findAll({
      where: {
        detail_server_serie: req.params.id,
        ep_server: req.params.server,
      },
    });

    res.send(postep);
  } catch (error) {
    next(error.message);
    console.log(error.message);
  }
};
const searchPost = async (req, res, next) => {
  try {
    const postep = await serie_det.findAll({
      where: {
        title_serie: { [Op.like]: `%${req.params.id}%` },
      },
    });

    res.send(postep);
  } catch (error) {
    next(error);
  }
};
module.exports = { getEp, getServr, searchPost };
