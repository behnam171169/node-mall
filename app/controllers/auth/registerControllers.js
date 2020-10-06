const User=require('./../../models/users');
var controller=require('./../controller');
var puretext = require('puretext');

const passport = require('passport');
const jwt = require("jsonwebtoken");
class registerController extends controller{
   
  async  registerprocess(req,res,next){
      
// var text = {
//   fromNumber: '+109106861071', // From number is the number you will buy from your admin dashboard
//   toNumber: '+109019851614', // To Number is the number you will be sending the text to
//   smsBody: 'Sending SMS using Node.js', // Text Content
//   apiToken: 'XXXXXX' //Sign up for an account to get an API Token
// };
 
// await puretext.send(text, function (err, response) {
//   if (err) {
//     console.log('there was an error',err)
//   }
//   else {
//     console.log('there was no error',response)
//   }
// })

        var result = Object.keys(req.body)[0]
        var obj = JSON.parse(result);
        
        User.findOne({ username:obj.username}, function (err, user) {
            if (err) { return done(err); }
    if(user) {

   return(
    res.status(400).json({
        
        message:"قبلا  با این ایمیل ثبت نام کرده اید"
    })
   )
 
   
}else{
   
    const adduser=new User({
      lastname:obj.lastname,
            name:obj.name,
            username:obj.username,
            password:obj.password,
        })
        adduser.save()
        const secretkey='54h46674b840ajkkjb658jgse95oiih28gjj00g64db10fdd990jg911236af';
const payload = {
    user: {
      id: adduser._id
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
      res.status(200).json({ message:"ثبت نام با موفقیت انجام شد",token,adduser})
    })

   

   
   
    }
          })
    }
async editprofile(req,res,next){
  var result = Object.keys(req.body)[0]
  var obj = JSON.parse(result);
  const userupdate=await User.findByIdAndUpdate({_id:req.params.id},{$set:{name:obj.name,lastname:obj.lastname,username:obj.username,password:''}})
if(userupdate){
  res.status(200).json({message:'error'})
}else{
  res.status(400).json({message:'ok'})
}
}
}
module.exports=new registerController();