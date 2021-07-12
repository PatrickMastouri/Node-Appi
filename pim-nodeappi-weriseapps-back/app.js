const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


require("./app/routes/users.routes")(app);
require("./app/routes/projects.routes")(app);
require("./app/routes/forums.routes")(app);
require("./app/routes/posts.routes")(app);
require("./app/routes/comments.routes")(app);
require("./app/routes/payments.routes")(app);
require("./app/routes/dragdrop.routes")(app);
require("./app/routes/reclamation.routes")(app);








// set port, listen for requests
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// connect to database
const db = require("./app/models");
db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });





//SWAGGER
var swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));