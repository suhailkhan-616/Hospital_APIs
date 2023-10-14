// ***********************Require libreries**********************
const  express = require('express');
//"""""""""""""" body Paser """"""""""""""""""""
const bodyParser = require('body-parser');
const port = 5500;
const app = express();
// :::::::::::::::::::::MongoDb Connection:::::::::::::::::::::::::::
const db = require('./config/mongoose');

// ...................passport............
const passport = require('passport');
const passportJwtStrategy = require('./config/passport-jwt-Strategy');


// {{{{{{{{{{{{ middleware }}}}}}}}}}}}
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())





// ''''''''''''''''''''''Passport-JWT-Authentication''''''''''''''''



// **************Routes*******************
app.use('/', require('./routes/home'));

// *******************server side****************
app.listen(port,function(err){
    if(err){
        console.log('Error in Server Internal Error',err);
    }

    console.log(`Successfull server is running ${port}`);
})