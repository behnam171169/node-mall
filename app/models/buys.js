const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const uniqueString = require('unique-string');
const Schema = mongoose.Schema;
const Buys=mongoose.Schema({
user:{type:Schema.Types.ObjectId,ref:'User'},
 title:{type:String,require:true},
 slug:{type:String,default:''},
prices:{type:String,require:true},
weight:{type:String,default:''},
country:{type:String,default:''},
garantis:{type:String,default:''},
numberinpuckets:{type:String,default:''},
memorys:{type:String,default:''},
explains:{type:String,require:true},
 images:{type:String,require:true},
types:{type:String,require:true},
Count:{type:Number,require:true},
color:{type:String,default:''},
check:{type:Boolean,default:false},
send:{type:Boolean,default:false},
resnumber:{type:Number,default:''},
    // rememberToken:{type:String,default:''},

},{
    timestampts:true,
})


module.exports=mongoose.model('Buys',Buys);