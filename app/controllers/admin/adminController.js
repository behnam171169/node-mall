const controller=require('./../controller');
const Buys=require('./../../models/buys');
 const User=require('./../../models/users');
 const reciver=require('./../../models/reciver');
const { findOne } = require('./../../models/buys');
class adminController extends controller{
    index(req,res,next){
        res.render()
    }
  async usersOrders(req,res,next){
  const BUY=await Buys.find({check:true,send:false});
  // console.log(BUY,'hgfds')
  let x=[];
  for(let i=0;i<BUY.length;i++){

  const resnumber=JSON.stringify(BUY[i].resnumber)

  const users=await User.findOne({_id:BUY[i].user});
  const See=await reciver.find({resnumber:BUY[i].resnumber})
console.log(See,'eeeee')
  let name=users.name;
  let lastname=users.lastname;
let see=See[0].see;
// const see=false;
// console.log(see,'vvvv')
  let data=[name,lastname,resnumber,see]
  x.push(data)
  for(let j=0;j<x.length-1;j++){
    
    if(x[j].indexOf(resnumber)!=-1){
  //  console.log('jkjkjfff')
   x.splice((x.length)-1)
     }
   
  }
  
    }
  // console.log(x[0][3][0].see,'ghgttrrr')
    res.status(200).json(x)
}
async usersOrdersdetail(req,res,next){
  // console.log(req.params.resnumber,'555555')
  // await reciver.findOneAndUpdate({resnumber:req.params.resnumber,$set:{see:true}})
  await reciver.findOneAndUpdate({resnumber:req.params.resnumber},{$set:{see:true}});
  const orderdetail=await reciver.find({resnumber:req.params.resnumber});
  const BUY=await Buys.find({resnumber:req.params.resnumber});
  
res.status(200).json([orderdetail,BUY])
  
}
async sendstuffok(req,res,next){

  // await Buys.findOneAndUpdate({resnumber:req.params.resnumber},{$set:{see:true}});
  await  Buys.updateMany({resnumber:req.params.resnumber},{$set:{send:true}});
  res.status(200).json({message:'ok'})
}
}

module.exports=new adminController();