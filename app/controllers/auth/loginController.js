const controller=require('app/controllers/controller');
const User=require('./../../models/users');
const uniqueString = require('unique-string');
const jwt = require("jsonwebtoken");
const config = require('../../config');
class loginController extends controller{
  loginprocess(req,res,next){
    var result = Object.keys(req.body)[0];
    var obj = JSON.parse(result);
    
    User.findOne({username:obj.username}, function (err, user) {
      
      if (err) { return done(err); }
      
      if(!user || !user.comparePassword(obj.password)) {
        
        res.status(400).json({
          
          message:"کاربری با این مشخصات ثبت نام نکرده است"
        })
      }else{
        const secretkey='54h46674b840ajkkjb658jgse95oiih28gjj00g64db10fdd990jg911236af';
        const payload = {
          user: {
            id: user._id,
            admin:false
          }
        };
        jwt.sign(
          payload,
          secretkey,
          {
            
            expiresIn:2000000
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({ message:"خوش آمدید",token,admin:user.admin,userid:user._id})
          }
          );
          
        }
      })
      
      
    }
    async logintoken(req,res,next){
      // console.log(req.user,'pppppppp')
      try {
        const user = await User.findById(req.user.id);
  
        if(!user){
          res.status(400).json('کاربری با این مشخصات ثبت نام نکرده است');
        }
        res.status(200).json(user);
        
      } catch (e) {
        res.send({ message: "Error in Fetching user" });
      }
    }
    
  }
  module.exports=new loginController();