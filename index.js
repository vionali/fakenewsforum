
const DEV = true;
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session')

const Posts = require('./model/Post.model.js')
const Users = require('./model/User.model.js')

const PostRoute = require('./routes/Post.route.js')(Posts)
const UserRoute = require('./routes/User.route.js')(Users)

app.use(session({
  secret: 'Im full',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 7*24*60*60*1000 }
}))

// Express Application Middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// Enabling cors
app.use(cors());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use("/", PostRoute);
app.use("/user", UserRoute);

startServer()
function startServer() {
  app.listen(process.env.PORT || 3000, () => console.log('Server succesfully started...'));
}
