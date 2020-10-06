const autoBind=require('auto-bind');
const path = require('path');
module.exports=class helper{
    constructor(req,res){
        autoBind(this);
        this.req = req;
        this.res = res;
    }
    object(){
        return{

req:this.req,

        }
    }

}