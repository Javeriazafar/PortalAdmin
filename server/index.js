const express= require ('express');
const mongoose= require ('mongoose');
const cors= require ('cors');
const router = require ('./routes/user.js');
const app = express();
const passport = require('passport')
const session = require('express-session')
require('./passport/passport')(passport)
 app.use(cors());
// app.options('*', cors());
app.use(express.json());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS")
  next();
});

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    //store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use("/user", router);
app.use('/auth', require('./routes/auth'));

const CONNECTION_URL = 'mongodb+srv://javeria:jazz1234@cluster0.amrmj.mongodb.net/test?retryWrites=true&w=majority'; //Change with yourmongodb connection string
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://127.0.0.1:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);