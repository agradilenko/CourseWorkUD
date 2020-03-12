const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app = express();

const corsOptions = {
  origin: "http://localhost:5432"
};

app.use(cors(corsOptions));

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
// Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

require("./app/routes/product.routes")(app);
require("./app/routes/type.routes")(app);
require("./app/routes/client.routes")(app);
require("./app/routes/discount.routes")(app);
require("./app/routes/delivery.routes")(app);
require("./app/routes/manufacturer.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/ordered.routes")(app);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// set port, listen for requests
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
