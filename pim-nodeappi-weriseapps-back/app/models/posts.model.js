module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
title: { type: String },
content: { type: String },
tags: { type: String },
likes: { type: Number },
UserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required :true},
forumId: {type: mongoose.Schema.Types.ObjectId, ref: 'forum',required :true}
},
{ timestamps: true }

);
schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Posts = mongoose.model("Posts", schema);
  return Posts;
};