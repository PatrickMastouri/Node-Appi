const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./users.model.js")(mongoose);
db.projects = require("./projects.model.js")(mongoose);
db.forums = require("./forums.model.js")(mongoose);
db.posts = require("./posts.model.js")(mongoose);
db.comments = require("./comments.model.js")(mongoose);
db.payments = require("./payments.model.js")(mongoose);
db.reclamation = require("./reclamation.model")(mongoose);





module.exports = db;