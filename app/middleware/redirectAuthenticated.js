class redirectAuthenticated{
    handle(req,res,next){
        if(req.isAuthenticated()) {
            
            console.log('hiii')
        }

    }
}
module.exports=new redirectAuthenticated();