const express=require('express');
const router=express.Router();
const authtoken=require('./../middleware/authtoken');
const registerController=require('./../controllers/auth/registerControllers');
const loginController=require('./../controllers/auth/loginController');
const forgetPasswordController=require('./../controllers/auth/forgetPasswordController');
const resetPasswordController=require('./../controllers/auth/resetPasswordController');

router.post('/register',registerController.registerprocess)
router.put('/editprofile/:id',registerController.editprofile)
router.post('/login',loginController.loginprocess)
router.post('/login/token',authtoken,loginController.logintoken)
router.post('/password/email',forgetPasswordController.passwordResetLink);
router.post('/password/reset',resetPasswordController.resetPassword);
module.exports=router;