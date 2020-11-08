const controller=require('./../controller');
const User=require('./../../models/users');
const uniqstring=require('unique-string');
const nodemailer=require('nodemailer');
const passwordReset=require('./../../models/password-reset');
class forgetPasswordController extends controller{
  async passwordResetLink(req,res,next){
    var result = Object.keys(req.body)[0];
    var obj = JSON.parse(result);
    console.log(obj.username,'qqqqq')
    await  User.findOne({username:obj.username}, function (err, user) {
      if (err) { return done(err); }
      console.log(user);
      if(user){
        res.status(200).json({message:'ok'}) 
      }
      else if(!user){
          res.status(400).json({message:'کاربری با این ایمیل ثبت نام نکرده است'}) 
        }
        
        const setpassword=new passwordReset({
          username:obj.username,
          token:uniqstring()
        })
        setpassword.save(err=>{
          console.log(err)
        })
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'behnam.maghsoudi17@gmail.com',
            pass: '4530056376'
          }
        });
        
        var mailOptions = {
          from: 'behnam.maghsoudi17@gmail.com',
          to: obj.username,
          subject: 'Sending Email using Node.js',
          text: 'از طریق لینک زیر پسوورد را تغییر دهید!',
          html:`<h1> لینک تغییر رمز عبور</h1>
          <a href="http://localhost:3001/Changepassword/${setpassword.token}">لینک</a>
          `,
        }
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            res.status(200).json({message:'ok'})
            console.log('Email sent: ' + info.response);
          }
        });
        
      })
    }
  }
  module.exports=new forgetPasswordController();