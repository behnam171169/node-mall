const mongoose=require('mongoose');
const passwordReset=mongoose.Schema({
    username:{type:String,required:true}, 
    token:{type:String,required:true}, 
    use:{type:Boolean,default:false}
},{
    timestampts:{updateAt:false}
})
module.exports=mongoose.model('passwordReset',passwordReset)