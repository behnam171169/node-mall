const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const uniqueString = require('unique-string');
const User = mongoose.Schema({
    admin: { type: Boolean, default: false },
    name: { type: String, require: true },
    lastname: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    rememberToken: { type: String, default: '' },

}, {
    timestampts: true,
})

User.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
})

    User.pre('findOneAndUpdate', function (next) {
        const salt = bcrypt.genSaltSync(15);
        
         
        //    this.password=this.password
if(this.getUpdate().$set.password.length>1){
console.log('hhjh')
    const hash = bcrypt.hashSync(this.getUpdate().$set.password, salt);
  
    this.getUpdate().$set.password = hash;
    next();
}else{
next();
    console.log('kjk')
}
        // const hash = bcrypt.hashSync(this.getUpdate().$set.password, salt);
        // this.getUpdate().$set.password = hash;
        // next();
    })


// User.pre('findByIdAndUpdate', function (next) {
//     // const salt = bcrypt.genSaltSync(15);
//     // const hash = bcrypt.hashSync(this.getUpdate().$set.password, salt);
//     this.getUpdate().$set.password = this.password;
//     next();
// })
User.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}
User.methods.setRememberToken = function (res) {
    const token = uniqueString();
    // res.cookie('remember_token',token,{maxAge:1000*60*60*24*6,httpOnly:true,signed:true});
    this.updateOne({ rememberToken: token }, err => {
        if (err) console.log(err);
    })
}

module.exports = mongoose.model('users', User);