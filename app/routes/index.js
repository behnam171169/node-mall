const express=require('express');
const router=express.Router();
const authRoutes=require('./auth');
const homeRoutes=require('./home');
const adminRoutes=require('./admin');
router.use('/auth',authRoutes);
router.use('/',homeRoutes);
router.use('/admin',adminRoutes);

module.exports=router;