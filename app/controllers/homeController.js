const controller=require('./controller');
const Comment=require('./../models/comments');
const Course=require('./../models/courses');
const Buys=require('./../models/buys');
const Reciver=require('./../models/reciver');
const users=require('./../models/users')
const request = require('request-promise');
class homeController extends controller{
  index(req,res){
    res.json('home');
  }
  async  detail(req,res){
    const datadetail=await Course.find({_id:req.params.id});
    if(datadetail.length>0){
      res.status(200).json(datadetail);
    }else{
      res.status(400).json({message:'جزییات موجود نمی باشد'});
    }
    
  }
  async  allstuff(req,res){
 
    const dataa=req.params.id;
    // console.log(dataa,'uuu')
    const data=dataa.split(',');
 
    const flowers=await Course.find({types:data[1],check:true});
   
    if(flowers){
      res.status(200).json(flowers);
    }
    
    else 
    {
      res.status(400).json({message:'notfound',title:'کالایی یافت نشد'});
    }
    
  }
  async  all(req,res){
    const flowers=await Course.find({check:true});
    if(flowers){
      res.status(200).json(flowers);
    }  else 
    {
      res.status(400).json({message:'notfound',title:'کالایی یافت نشد'});
    }

  }
  async createcomment(req,res){
    // console.log(req.body,'hgfffffdddd')
    var result = Object.keys(req.body)[0];
    var obj = JSON.parse(result);
    const addcomments=new Comment({
      user:'5ec6285ed10d8a2628dd5ee0',
      course:obj.course,
      name:obj.name,
      comment:obj.comment
    })
    addcomments.save(err=>console.log(err))
    if(addcomments.save){
      res.status(200).json({message:'نظر شما با موفقیت ثبت شد'})
    }else{
      res.status(400).json({message:'خطا در ثبت نظر'})
    }
    
      
    }
    async comments(req,res,next){
      // console.log(req.params.id,'rrrr')
      const comments=await Comment.find({course:req.params.id,check:true});
      res.status(200).json(comments);
    }
    async buys(req,res,next){
      var result = Object.keys(req.body)[0];
      var obj = JSON.parse(result);
      console.log(obj.userid,'jkj55555kj')
      const course=await Course.find({_id:obj.id});
      console.log(course,'iiiooo')
      const buys=new Buys({
        user:obj.userid,
        title:course[0].title,
        slug:course[0].slug,
        prices:course[0].prices,
        explains:course[0].explains,
        country:course[0].country,
        weight:course[0].weight,
        garantis:course[0].garantis,
        numberinpuckets:course[0].numberinpuckets,
        memorys:course[0].memorys,
        images:course[0].images,
        types:course[0].type,
        Count:obj.number,
        
      })
      buys.save(err=>console.log(err))
      if(buys.save){
        return(
          res.status(200).json({
            message:"ثبت سفارش با موفقیت انجام شد"
          })
          )
        }
        
      }
      async userbuys(req,res,next){
        //  console.log(req.params.id,'oooooppppp')
        const BUY=await Buys.find({user:req.params.id,check:false});
        let allprices=0;
        BUY.map((data)=>{
          allprices += Number(data.prices)*data.Count; 
        })
        // console.log(allprices,'wwww')
        res.status(200).json({BUY,allprices})
      }
      
      async buysplus(req,res,next){
   
        var result = Object.keys(req.body)[0];
        var obj = JSON.parse(result);

        await Buys.findOneAndUpdate({user:req.params.id,_id:obj.id},{ $inc: { Count: 1 }})
        res.status(200).json({message:'ok'})
      }
      async buyssubtract(req,res,next){
        var result = Object.keys(req.body)[0];
        var obj = JSON.parse(result);
        //  console.log(result,'sshhs')
        await Buys.findOneAndUpdate({user:req.params.id,_id:obj.id},{ $inc: { Count: -1 }})
        res.status(200).json({message:'ok'})
        
      }
      async buydelete(req,res,next){
        
        var result = Object.keys(req.body)[0];
        // var obj = JSON.parse(result);
        console.log(req.params.id,'sshhnn22nnns')
        let datadelete= await Buys.findOne({user:req.params.id,_id:req.headers.id})
        datadelete.remove()
        res.status(200).json('حذف با موفقیت انجام شد')
      }
      async reciverdetails(req,res,next){
        var result = Object.keys(req.body)[0];
        var obj = JSON.parse(result);
        console.log(obj,'1212')
        const reciver=new Reciver({
          user:obj.user,
          name:obj.name,
          lastname:obj.lastname,
          codemeli:obj.codemeli,
          codeposti:obj.codeposti,
          number:obj.number,
          addres:obj.addres,
          location:obj.location,
          city:obj.city,
          province:obj.province
          
        })
        reciver.save(err=>console.log(err))
        if(reciver.save){
          return(
            res.status(200).json({
              message:"ok"
            })
            )
          }
        }
        async getreciverdetails(req,res,next){
          console.log(req.params.id,'ll')
          const BUY=await Buys.find({user:req.params.id});
          
          const reciver=await Reciver.find({user:req.params.id,pay:false});
          console.log(BUY,'ggghhh')
          res.status(200).json(reciver)
        }
        async  editreciverdetails(req,res,next){
          
          var result = Object.keys(req.body)[0];
          var obj = JSON.parse(result);
          
          const ww= await Reciver.findOneAndUpdate({user:req.params.id,$set:{  
            name:obj.name,
            lastname:obj.lastname,
            codemeli:obj.codemeli,
            codeposti:obj.codeposti,
            number:obj.number,
            addres:obj.addres,
            location:obj.location,
            city:obj.city,
            province:obj.province}});
            if(ww){
              return(
                res.status(200).json({
                  message:"ok"
                })
                )
              }
              
            }
            async checkreciverdetails(req,res,next){
              
              const reciver=await Reciver.find({user:req.params.id,pay:false});
              if(reciver.length>0){
                return(
                  res.status(200).json({
                    message:"ok"
                  })
                  )
                }else{
                  return(
                    res.status(400).json({
                      message:"error"
                    })
                    )
                  }
                }
                
                async payment(req,res,next){
                  var result = Object.keys(req.body)[0];
                  var obj = JSON.parse(result);
                  console.log(obj,'uuu')
                  let params = {
                    MerchantID: '97221328-b053-11e7-bfb0-005056a205be',
                    Amount: 110,
                    CallbackURL: 'http://localhost:3000/payment/callbackurl',
                    Description: `خرید از به کالا`,
                    Mobile:obj.number,
                  }
                  let options = this.getOptions('https://www.zarinpal.com/pg/rest/WebGate/PaymentRequest.json', params);
                  request(options)
                  .then(async data => {
                    await Reciver.findOneAndUpdate({user:obj.id,resnumber:data.Authority});
                    res.status(200).json({message:data})
                    
                  })
                  .catch(err => res.json(err.message));
                }
                
                async callbackurl(req, res, next) {
                  
                  
                  // const payment = await Payment.findOne({ resnumber: req.query.Authority }).populate('course').exec();
                  // if (!payment.course) {
                  //     res.json('not course')
                  // }
                  // if (req.query.Status && req.query.Status != 'OK') {
                  //     res.json('not ok')
                  // }
                  let params = {
                    MerchantID: '97221328-b053-11e7-bfb0-005056a205be',
                    Authority: req.query.Authority,
                    Amount: 110,
                  }
                  let options = this.getOptions('https://www.zarinpal.com/pg/rest/WebGate/PaymentVerification.json', params);
                  request(options)
                  .then(async data =>{
                    // console.log(data,'kjkj')
                    // console.log(req.query,'ppllkkoo')
                    // console.log(req.body,'ppp')
                    if(data.Status == 100){
                      await Reciver.findOneAndUpdate({resnumber:req.query.Authority},{$set:{pay:true}})
                      const Reciver2=await Reciver.findOne({resnumber:req.query.Authority})
                      await  Buys.updateMany({user:Reciver2.user},{$set:{check:true,resnumber:req.query.Authority}})
                      console.log(Reciver2)
                      // await  Buys.update({user:Reciver2.user}, {$set:{check:true}})
                      //  Buys.find({user:Reciver.user}, function(err, users) {
                      //  Buys.find({user:Reciver.user}, function(err, users) {
                      //   users.forEach(function(user) {
                      //     users.check = true;
                      //   });
                      // })
                      //     let buys= Buys.find( { user:Reciver.user } ).update( { $set: { check:true } } );
                      // // await Buys.updateMany({user:Reciver.user},{$set:{check:true}})
                      //     for(let i=1;i<buys.length;i++){
                      //       buys[0].check=true
                      //     //  console.log(buys[i],'o,,,,oo') 
                      //       // .findOneAndUpdate({user:Reciver.user},{$set:{check:true}})
                      //     }
                      //   // await Reciver.updateOne({'user' : req.user.id} , { $set : { payCash : payment.course.id }});
                      //  await Reciver.findOneAndUpdate(obj.id,{$set:{pay:false}});
                      // payment.set({ payment : true});
                      // await User.updateOne({'_id' : req.user.id} , { $set : { payCash : payment.course.id }});
                      // await payment.save();
                      
                      res.redirect('http://localhost:3001/');
                    }else {
                      res.json('payment not execute')
                    }
                  })
                  .catch(err => res.json(err.message))
                }
                
                getOptions(url, params) {
                  return {
                    method: 'POST',
                    url: url,
                    header: {
                      'cache-control': 'no-cache',
                      'content-type': 'application/json'
                    },
                    body: params,
                    json : true
                  }
                }
                async customerbuys(req,res,next){
                  console.log(req.params,'aaa')
                  const BUY=await Buys.find({user:req.params.id,check:true});
                  // let allprices=0;
                  // BUY.map((data)=>{
                  //   allprices += Number(data.prices)*data.Count; 
                  // })
                  
                  res.status(200).json({BUY})
                }
                async editprofile(req,res,next){
                  console.log(req.params,'iii')
                  const profile=await users.find({_id:req.params.id})
                  if(profile){
                    res.status(200).json({data:profile})
                  }
                }
              }
              module.exports=new homeController();