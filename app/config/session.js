const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const mongoose=require('mongoose');
module.exports={
    secret:'secretID' ,
    secretkey:'54h46674b840ajkkjb658jgse95oiih28gjj00g64db10fdd990jg911236af',

    resave:true,
    saveUninitialized:true,
    store:new MongoStore({mongooseConnection:mongoose.connection}),
    // cookie:{secure:true}
}