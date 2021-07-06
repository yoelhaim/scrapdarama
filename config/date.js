const moment = require("node-moment");
// var today = new Date();
// var dd = String(today.getDate()).padStart(2, "0");
// var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
// var yyyy = today.getFullYear();
// var h = today.getHours();
// var m = today.getMinutes();
// var s = today.getSeconds();

// today = yyyy + "-" + mm + "-" + dd;
// " " + h + ":" + m + ":" + s
const today = moment().format("YYYY-MM-DD");
module.exports = today;
