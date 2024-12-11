const express= require('express')
const morgan= require('morgan');
const cors= require('cors');
const app = express();
const {mongoose} = require('./database');
const {json} = require('express')

// Settings
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(json());

// Routes
app.use('/api/v1/movies', require('./routes/movie.route'));
//app.use('/', (req, res) =>res.send('API is in /api/v1/movies'));
app.use('/', (req, res) =>res.status(400).json({status:'API is in /api/v1/movies'}));


// Starting the server
app.listen(app.get('port'), ()=>{
    console.log('Server on port: ', app.get('port'));
})

