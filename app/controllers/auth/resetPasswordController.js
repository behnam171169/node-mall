const controller=require('./../controller');
const User=require('./../../models/users');
const uniqstring=require('unique-string');
const passwordReset=require('./../../models/password-reset');
class resetPasswordController extends controller{
    async resetPassword(req,res,next){
        var result = Object.keys(req.body)[0];
        var obj = JSON.parse(result);
        // console.log(req.body,'hgfdddsssssssss')
        let passwordreset=await  passwordReset.findOne({username:obj.username,token:obj.token});
        
        if(! passwordreset){
            
            res.status(400).json({message:"اطلاعات وارد شده صحیح نمی باشد"});
        }
        if(passwordReset.use){
            res.status(400).json({message:"از این لینک قبلا برای تغییر پسورد استفاده شده است"})
            
        }
        let user=await User.findOneAndUpdate({username:obj.username},{$set:{password:obj.password}})
     
        if(! user){
            res.status(400).json({message:"کاربری با این مشخصات در سیستم وجود ندارد"})
            
        }else{
            passwordreset.update({use:true},err=>{console.log(err)})
            res.status(200).json({message:"عملیات با موفقیت انجام شد"})
            
        }
        
    }
}
module.exports=new resetPasswordController();