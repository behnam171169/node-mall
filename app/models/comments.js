const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    course: { type: Schema.Types.ObjectId, ref: 'Course', default: undefined },
   name: { type: String, required: true },
    comment: { type: String, required: true },
    check: { type: Boolean, default: false },
    // parent: { type: Schema.Types.ObjectId, ref: 'Comment', default: null }
}, {
        timestampts: true,
        toJSON: { virtuals: true }
    });


module.exports = mongoose.model('Comment', Comment);