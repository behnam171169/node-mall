const express=require('express');
const http=require('http');
const path=require('path');
const mongoose=require('mongoose');
const Helper=require('./routes/helper');
const app=express();
const session=require('express-session');
const MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport=require('passport');


var cors = require('cors');
module.exports=class Application{
    constructor(){
        this.configServer();
        this.configDatabase();
        this.setconfig();
        this.setRoutes();
        
   
    }
   
    configServer(){
        const server=http.createServer(app)
        server.listen(3000,(err)=>{
            if(err) console.log(err)
            console.log('server')
        })
    }
    configDatabase(){
mongoose.Promise=global.Promise;
mongoose.connect(config.database.url,{useFindAndModify:false})
    }
    setconfig(){
       
        app.use(cors());
        app.set(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended:true }));
        app.use(session({...config.session}));
        app.use(session({
            secret: 'secretID',
            resave: true,
           store:new MongoStore({mongooseConnection:mongoose.connection}),
            saveUninitialized: true,
            cookie: { secure: true }
          }));
       
          app.use(cookieParser('secretID'));   
          app.use(passport.initialize());
          app.use(passport.session());
        //   app.use(rememberLogin.handle);
        app.use((req,res,next)=>{
            app.locals=new Helper(req,res).object()
            next();
        })
    }
    setRoutes(){
        app.use(require('./routes'));

    }
}