const { JSDOM } = require("jsdom");
const axios = require("axios");
const fs = require("fs");
const express = require("express");
var app = express();
const bodypar = require("body-parser");
const cors = require("cors");

///// connect data base
const { seriel, serie_det, favorite, users } = require("./model");
const { epl, serverl, serie_detl } = require("./model");
/////////// finconnect data bnase
app.use(cors());

app.get("/add/", function (req, res) {
  res.sendFile(__dirname + "/post.html");
});
var urlencodedParser = bodypar.urlencoded({ extended: false });

app.post("/", urlencodedParser, (req, res) => {
  const Postid = Math.round(new Date().getTime() / 1000);
  const cg = [];
  (async () => {
    try {
      // https://asia2tv.net/category/asian-drama/chinese-taiwanese/page/4
      let resp = await axios.get(req.body.links);
      let { document } = new JSDOM(resp.data).window;
      let series = document.querySelectorAll(".wrapper .box-item");

      for (serie of series) {
        const Postidse = Math.round(new Date().getTime() / 1000);
        let serie_info = { episodes: [] };
        serie_info.image = serie
          .querySelector(".postmovie-photo .image  > img")
          .getAttribute("src");
        serie_info.link = serie
          .querySelector(".postmovie-photo >a:first-child")
          .getAttribute("href");
        serie_info.title = serie
          .querySelector(".postmovie-photo >a:first-child")
          .getAttribute("title");

        let originalStrings = serie_info.title;
        let bufferObjs = Buffer.from(originalStrings);
        let titlequerys = bufferObjs
          .toString("base64")
          .replace("/", "")
          .replace("&", "")
          .replace("?", "");
        console.log(serie_info.image + ">>>>>>>>>>>>>>>");
        /////// sql insert serie
        const checkserie = await seriel.findAll({
          where: { id__film_gen: titlequerys },
        });
        if (checkserie.length > 0) {
          console.log(`waaaaaaaa3 ${checkserie.length}`);
        } else {
          const add = await seriel.create({
            title_film: serie_info.title,
            img__film: serie_info.image,
            id__film_gen: titlequerys,
          });
        }

        ////// sql insert

        let resp = await axios.get(serie_info.link);
        let { document } = new JSDOM(resp.data).window;

        let eps = document.querySelectorAll(".loop-episode > a ");
        let ep_title = document.querySelector(
          " .info-detail-single >h1 .title"
        ).textContent;
        let ep_name = document.querySelector(
          " .info-detail-single >ul > li:first-child"
        ).lastChild.textContent;
        let image = document
          .querySelector(".single-drama div >div >div > img:first-child ")
          .getAttribute("src");
        let aute = document.querySelector(
          " .info-detail-single >ul >li:nth-child(2)"
        ).lastChild.textContent;
        let allep = document.querySelector(
          " .info-detail-single >ul >li:nth-child(3)"
        ).lastChild.textContent;
        let country = document.querySelector(
          " .info-detail-single >ul >li:nth-child(4)"
        ).lastChild.textContent;
        let desc = document.querySelector(
          " .info-detail-single .getcontent > p"
        ).textContent;

        let mm = document.querySelector(
          " .info-detail-single .getcontent > p:last-of-type"
        ).textContent;

        let originalStringst = serie_info.title;
        let bufferObjst = Buffer.from(originalStringst);
        let titlequeryst = bufferObjst
          .toString("base64")
          .replace("/", "")
          .replace("&", "")
          .replace("?", "");

        /////// sql insert serie_detail
        const checkseriedet = await serie_detl.findAll({
          where: { id_serie_detail: titlequerys },
        });
        if (checkseriedet.length > 0) {
          console.log(`waaaaaaaa3 ${checkseriedet.length}`);
        } else {
          const add = await serie_detl.create({
            title_serie: ep_name,
            country_serie: country,
            desc_serie: desc,
            img_serie: image,
            views_serie: 0,
            views: 0,
            date_serie: "w777",
            namedrama__serie: mm,
            id_serie_detail: titlequeryst,
            autrename: aute,
            allep: allep,
          });
        }
        ////// sql inser

        // get serie info
        var epp = 1;
        for (ep of eps) {
          let ep_info = { servers: [] };
          let ep_link = ep.getAttribute("href");
          let titleep = ep.querySelector("div").textContent;

          let originalString = ep_title;
          let bufferObj = Buffer.from(originalString);
          let titlequery = bufferObj
            .toString("base64")
            .replace("/", "")
            .replace("&", "")
            .replace("?", "");

          /////// sql insert ep
          const checkepp = await epl.findAll({
            where: { id_detail_ep: titlequerys },
          });

          const add = await epl.create({
            name_ep: titleep,
            id_detail_ep: titlequery,
            ep_serie: epp,
            stt: 0,
          });

          ////// sql insert

          let resp = await axios.get(ep_link);

          let { document } = new JSDOM(resp.data).window;
          let servers = document.querySelectorAll(".server-list-menu  li");
          let titleinserver = document.querySelector(
            ".single-episode >h1"
          ).textContent;
          console.log(titleinserver + " <<< ---- ");
          // get ep info
          for (server of servers) {
            let server_link = server.getAttribute("data-server");
            ep_info.servers.push({ server_link });
            console.log(server_link);
            /////// sql insert server_serie
            const checkserv = await serverl.findAll({
              where: { detail_server_serie: titlequerys },
            });

            const add = await serverl.create({
              server_serie: server_link,
              name_server_serie: titleinserver,
              detail_server_serie: titlequery,
              ep_server: epp,
            });

            ////// sql insert
          }
          // break;
          serie_info.episodes.push({ ep_info });
          epp++;
        }
        console.log("✅ Done is success upload on database!");
        cg.push(serie_info);
        // break;
      }
      console.log("✅ Done!");
      res.send("done successs");
      // fs.writeFileSync("data" + Postid + ".json", JSON.stringify(cg, null, 2));
    } catch (err) {
      throw err;
      return true;
    }
  })();
});

app.post("/simple", urlencodedParser, (req, res) => {
  const Postid = Math.round(new Date().getTime() / 1000);
  const cg = [];
  (async () => {
    try {
      // https://asia2tv.net/category/asian-drama/chinese-taiwanese/page/4
      let resp = await axios.get(req.body.links);

      let { document } = new JSDOM(resp.data).window;

      let eps = document.querySelectorAll(".loop-episode > a ");
      let ep_title = document.querySelector(
        " .info-detail-single >h1 .title"
      ).textContent;
      let ep_name = document.querySelector(
        " .info-detail-single >ul > li:first-child"
      ).lastChild.textContent;
      let image = document
        .querySelector(".single-drama div >div >div > img:first-child ")
        .getAttribute("data-original");
      let aute = document.querySelector(
        " .info-detail-single >ul >li:nth-child(2)"
      ).lastChild.textContent;
      let allep = document.querySelector(
        " .info-detail-single >ul >li:nth-child(3)"
      ).lastChild.textContent;
      let country = document.querySelector(
        " .info-detail-single >ul >li:nth-child(4)"
      ).lastChild.textContent;
      let desc = document.querySelector(
        " .info-detail-single .getcontent > p"
      ).textContent;

      let mm = document.querySelector(
        " .info-detail-single .getcontent > p:last-of-type"
      ).textContent;

      let originalStringst = ep_title;
      let bufferObjst = Buffer.from(originalStringst);
      let titlequerys = bufferObjst
        .toString("base64")
        .replace("/", "")
        .replace("&", "")
        .replace("?", "");

      /////// sql insert
      var sql =
        "INSERT INTO `serie`(`title_film`, `img__film`, `id__film_gen`)VALUES('" +
        ep_title +
        "','" +
        image +
        "','" +
        titlequerys +
        "');";
      mysqlConn.query(sql, function (err, result) {
        if (!err) {
          // console.log(titleep);
        } else {
          console.log(err);
        }
      });

      ////// sql insert

      /////// sql insert
      var sql =
        "INSERT INTO `serie_detail` (`id_serie`, `title_serie`, `country_serie`, `desc_serie`, `img_serie`, `views_serie`, `date_serie`, `namedrama__serie`, `id_serie_detail`,`autrename`,`allep`) VALUES (NULL, '" +
        ep_name +
        "', '" +
        country +
        "', '" +
        desc +
        "', '" +
        image +
        "', '0', '03/01/2021', '" +
        mm +
        "', '" +
        titlequerys +
        "','" +
        aute +
        "','" +
        allep +
        "');";
      mysqlConn.query(sql, function (err, result) {
        if (!err) {
          console.log(ep_name);
        } else {
          console.log(err);
        }
      });

      ////// sql inser

      // get serie info
      var epp = 1;
      for (ep of eps) {
        let ep_info = { servers: [] };
        let ep_link = ep.getAttribute("href");
        let titleep = ep.querySelector("div").textContent;

        let originalString = ep_title;
        let bufferObj = Buffer.from(originalString);
        let titlequery = bufferObj
          .toString("base64")
          .replace("/", "")
          .replace("&", "")
          .replace("?", "");

        /////// sql insert
        var sql =
          "INSERT INTO `ep`(`name_ep`, `id_detail_ep`,`ep_serie`)VALUES('" +
          titleep +
          "','" +
          titlequery +
          "','" +
          epp +
          "');";
        mysqlConn.query(sql, function (err, result) {
          if (!err) {
            console.log(ep_name);
          } else {
            console.log(err);
          }
        });

        ////// sql insert

        let resp = await axios.get(ep_link);

        let { document } = new JSDOM(resp.data).window;
        let servers = document.querySelectorAll(".server-list-menu  li");
        let titleinserver = document.querySelector(
          ".single-episode >h1"
        ).textContent;
        console.log(titleinserver + "<<<>>><<<>>>.............");
        // get ep info
        for (server of servers) {
          let server_link = server.getAttribute("data-server");
          ep_info.servers.push({ server_link });
          console.log(server_link);
          /////// sql insert
          var sql =
            "INSERT INTO `server_serie`(`server_serie`, `name_server_serie`, `detail_server_serie`,`ep_server`)VALUES('" +
            server_link +
            "','" +
            titleinserver +
            "','" +
            titlequery +
            "','" +
            epp +
            "');";
          mysqlConn.query(sql, function (err, result) {
            if (!err) {
              console.log(server_link);
            } else {
              console.log(err);
            }
          });

          ////// sql insert
        }
        // break;

        epp++;
      }
      console.log("✅ Done is success upload on database!");

      // break;

      console.log("✅ Done!");

      res.send("done successs");
      fs.writeFileSync("data" + Postid + ".json", JSON.stringify(cg, null, 2));
    } catch (err) {
      throw err;
      return true;
    }
  })();
});

app.listen(3000, () => console.log(" connect"));
