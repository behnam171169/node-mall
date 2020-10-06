const passport = require('passport');
const User=require('./../models/users');
const localStrategy=require('passport-local').Strategy;
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
passport.use('local.register',new localStrategy({
    usernameField:'email',
    passReqToCallback:true,
},(req,email,done)=>{
User.findOne({'email':email},(err,user)=>{
    if(err) {return done(err);}
    if(user) {console.log('کاربری با این مشخصات قبلا ثبت نام کرده است')}   else
    {
        var result = Object.keys(req.body)[0],
        var obj = JSON.parse(result), 
      const adduser=new User({
  
        name:obj.name,
        email:obj.email,
        password:obj.password
    });
    adduser.save((err)=>{
        console.log('jjj')
      if(err) return done(null,false,console.log('errrr'))
      else{
        done(null,adduser)
      }
 
  })
    }

})
}))