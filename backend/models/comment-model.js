const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    description : {
        type : String,
        required : true
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    content_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Content'
    },
    parent_comment_id :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }],
    created_at : {
        type : Date,
        default : Date.now
    }
});

const Comment = mongoose.model('Comment',CommentSchema);
module.exports = Comment;