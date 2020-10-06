const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const uniqueString = require('unique-string');
const Schema = mongoose.Schema;
const Course=mongoose.Schema({

    user:{type:Schema.Types.ObjectId,ref:'User'},
   title:{type:String,require:true},
   slug:{type:String,default:''},
   prices:{type:String,default:''},
   weight:{type:String,default:''},
   color:{type:String,default:''},
   country:{type:String,default:''},
   garantis:{type:String,default:''},
   numberinpuckets:{type:String,default:''},
   memorys:{type:String,default:''},
    explains:{type:String,require:true},
    images:{type:String,require:true},
   types:{type:String,require:true},
    buyCount:{type:Number,default:0},
    commentCount:{type:String,default:0},
check:{type:Boolean,default:false},
    rememberToken:{type:String,default:''},

},{
    timestampts:true,
})


module.exports=mongoose.model('Courses',Course);