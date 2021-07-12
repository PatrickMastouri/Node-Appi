module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        content: { type: String },
        UserId: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required :true},
        PostId: {type: mongoose.Schema.Types.ObjectId, ref: 'post',required :true},
    
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Comments = mongoose.model("Comments", schema);
    return Comments;
  };