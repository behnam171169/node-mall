// const User=require('./../models/users');
// const middleware=require('./../middleware/middleware');
// class rememerLogin extends middleware{
//     handle(req,res,next){
//         if(!req.isAuthenticated()){

//             const rememberToken=req.signedCookies['remember_token'];
        
//             if(rememberToken){
//                 return this.userFind(rememberToken,req,next)
//             }
//         }
//         next();
//     }
//     userFind(rememberToken,req,next){
//         User.findOne({rememberToken})
//         .then(user=>{
//             if(user){
//                 req.login(user,err=>{
//                     if(err) console.log(err);
//                     next();
//                 })
//             }else{
//                 next();
//             }
           
//         })
//     }

// }
// module.exports=new rememerLogin();