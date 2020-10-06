const controller=require('./../../controller');
const Course=require('./../../../models/courses');
Comments=require('./../../../models/comments');
const fs=require('fs');
const { Console } = require('console');
class courseController extends controller{
    async index(req,res,next){
        const courses=await Course.find({check:false});

     res.json(courses)
    }
    store(req,res,next){
     
let images=this.getDirImage(`${req.file.destination}/${req.file.filename}`)
let{title,type,prices,explains,weight,color,country,garantis,numberinpuckets,memorys}=req.body;
        const addcourse=new Course({
            // user:req.user._id,
            title:title,
            slug:this.slug(title),
            prices:prices,
             explains:explains,
             images:images,
             types:type,
             weight:weight,
             color:color,
             country:country,
             garantis:garantis,
             numberinpuckets:numberinpuckets,
             memorys:memorys
        })
        addcourse.save(err=>console.log(err))
        if(addcourse.save){
            return(
                res.status(200).json({
                    message:"ایجاد پست جدید با موفقیت انجام شد"
                })
            )
        }
       
    }
    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, '-')
    }
    getDirImage(dir){
return dir.substring(8)
    }
    async destroy(req,res,next){
        let course=await Course.findById(req.params.id);
        if(! course){
            res.status(400).json('چنین کالایی در سایت ثبت نشده است')
        }
        const image=course.images;
        fs.unlinkSync(`./public${image}`)
        course.remove()
  res.status(200).json('حذف با موفقیت انجام شد')
    }
    // -------------------------------------
    async update(req,res,next){
        var result = Object.keys(req.body)[0];
        var obj = JSON.parse(result);
      console.log(obj,'gggg')
       await Course.findByIdAndUpdate(req.params.id,{$set:{...obj}});
       res.status(200).json({message:'ok'})
        
    }
    // ---------------------
    async check(req,res,next){
   
  await Course.findByIdAndUpdate(req.params.id,{$set:{check:true}});
res.status(200).json({message:'عملیات با موفقیت انجام شد'})
    }
    async comments(req,res,next){

    const comment= await Comments.find({check:false})
   if(comment){
       res.status(200).json(comment)
   }
 
    }
    async commentsok(req,res,next){
        // console.log(req.params,'kkkkk')
         await Comments.findByIdAndUpdate(req.params.id,{$set:{check:true}})
res.status(200).json({message:"نظر کاربر تاییدشد"})
    }
    // -------------------
  async  commentsdelete(req,res,next){
      console.log(req.params,'kkjj')
    let comments=await Comments.findById(req.params.id);
 
    comments.remove()
    res.status(200).json('حذف با موفقیت انجام شد')
  }
}
module.exports=new courseController();