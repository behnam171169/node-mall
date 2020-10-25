const express=require('express');
const router=express.Router();
// const multer=require('multer');
// const upload=multer({dest:'./public'})

const upload=require('./uploadImage');
const courseController=require('./../controllers/admin/course/courseController');
const adminController=require('./../controllers/admin/adminController');
const fileToField=require('./../middleware/fileToField');
router.post('/course/create',upload.single('file'),fileToField.handle,courseController.store);
router.get('/courses',courseController.index);
router.get('/mycourses/:id',courseController.mycourses);
router.put('/courses/check/:id',courseController.check)
router.delete('/course/:id',courseController.destroy);
router.put('/course/edit/:id',courseController.update);
// router.get('/checkadmin',courseController.comments)
// ------------------------
router.get('/comments',courseController.comments)
router.put('/commentsok/:id',courseController.commentsok)
router.delete('/commentsdelete/:id',courseController.commentsdelete)
// --------------------
router.post('/orders',adminController.usersOrders)
router.get('/ordersdetail/:resnumber',adminController.usersOrdersdetail)
router.get('/ordersdetail/:resnumber',adminController.usersOrdersdetail)
router.delete('/sendstuff/ok/:resnumber',adminController.sendstuffok)
// ----------------
router.get('/userquestions',adminController.userquestions)


module.exports=router;