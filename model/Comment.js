const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema({
  replyBody: {
    type: Schema.Types.ObjectId,
    default: () => Types.ObjectId()
  },
  writtenBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  }
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  })

const CommentSchema = new Schema({
  writtenBy: {
    type: String
  },
  commentBody: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  replies: [ReplySchema]
});

CommentSchema.virtual('replyCount').get(function () {
  return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;