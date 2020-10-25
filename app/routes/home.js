const express=require('express');
const redirectAuthenticated=require('./../middleware/redirectAuthenticated');
const router=express.Router();
const homeController=require('./../controllers/homeController');
router.get('/',homeController.index)
router.get('/allstuff/:id',homeController.allstuff)
router.get('/all',homeController.all)
router.get('/detail/:id',homeController.detail)
// -------------------------
router.post('/createcomment',homeController.createcomment)
router.get('/comments/:id',homeController.comments)
// -----------------------------
router.get('/user/buys/:id',homeController.userbuys)
router.put('/user/buys/plus/:id',homeController.buysplus)
router.put('/user/buys/subtract/:id',homeController.buyssubtract)
router.delete('/user/buys/delete/:id',homeController.buydelete)
router.get('/user/customerbuys/:id',homeController.customerbuys)
router.post('/buys',homeController.buys)
router.post('/reciverdetails',homeController.reciverdetails)
router.get('/getreciverdetails/:id',homeController.getreciverdetails)
router.put('/editreciverdetails/:id',homeController.editreciverdetails)
router.get('/checkreciverdetails/:id',homeController.checkreciverdetails)
router.get('/edietprofile/:id',homeController.editprofile)
// --------------------------------------
router.post('/payment', homeController.payment);
router.get('/payment/callbackurl',homeController.callbackurl);
// -------------------------------------------
router.post('/customerquestion',homeController.customerquestion);

 module.exports=router;