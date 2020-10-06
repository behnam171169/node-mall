const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const uniqueString = require('unique-string');
const Schema = mongoose.Schema;
const Reciver=mongoose.Schema({
    user:{type:Schema.Types.ObjectId,ref:'User'},
    name:{type:String,require:true},
   lastname:{type:String,require:true},
   slug:{type:String,default:''},
   codemeli:{type:String,require:true},
   codeposti:{type:String,require:true},
   number:{type:Number,require:true},
   resnumber:{type:Number,default:''},
   province:{type:String,require:true},
   city:{type:String,require:true},
    location:{type:Array,require:true},
    addres:{type:String,require:true},
pay:{type:Boolean,default:false},
see:{type:Boolean,default:false},
    // rememberToken:{type:String,default:''},
},{
    timestampts:true,
})


module.exports=mongoose.model('Reciver',Reciver);