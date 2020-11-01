const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question= mongoose.Schema({
   question: { type: String, required: true },
    answer: { type: String, default:'فعلا پاسخی داده نشده'},
    user: {type: String,required: true },
}, {
        timestampts: true,
        toJSON: { virtuals: true }
    });


module.exports = mongoose.model('Question', Question);